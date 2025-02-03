// @ts-check

/**
 * @template T
 */
class State {
    /** @type {RibElement[]} */
    #observers = [];
    /** @type {T} */
    #value;

    /**
     * @param {T} value
     */
    constructor(value) {
        this.#value = value;
    }

    /**
     * @returns {T}
     */
    get() {
        return this.#value;
    }

    /**
     * @param {T} value
     */
    update(value) {
        if (typeof value === "function") {
            this.#value = value(this.#value);
        } else {
            this.#value = value;
        }

        for (const obs of this.#observers) {
            obs.notify(this);
        }
    }

    /**
     * @param {(v: T) => undefined} callback
     */
    modify(callback) {
        callback(this.#value);

        for (const obs of this.#observers) {
            obs.notify(this);
        }
    }

    /**
     * @param {RibElement} obs
     */
    addObserver(obs) {
        this.#observers.push(obs);
    }
}

/**
 * @typedef {RibElement | string | (() => RibElement | RibElement[]) | State<any>} RibElementLike
 * @typedef {{ value: RibElementLike; toNode: () => Node | Node[] }} MorphRibElement
 * @typedef {string | RibElementAttribute | RibElementAttributeStyle} RibElementAttributeLike
 */

class RibElement {
    /** @type {HTMLElement} */
    #elem;
    /** @type {RibElementAttributeLike[]} */
    #attrs;
    /** @type {MorphRibElement[]} */
    #children;
    /** @type {Map<number, number>} */
    #multiNodes = new Map();
    /** @type {Map<number, number>} */
    #indexTranslation = new Map();

    /**
     * @param {string} name
     * @param {RibElementAttributeLike[]} attrs
     * @param {RibElementLike[]} children
     */
    constructor(name, attrs, children) {
        this.#elem = document.createElement(name);

        this.#children = children.map(ribify);

        let nodeIdx = 0;
        for (let i = 0; i < this.#children.length; i++) {
            const node = this.#children[i].toNode();

            this.#indexTranslation.set(i, nodeIdx);

            if (Array.isArray(node)) {
                nodeIdx += node.length;
                this.#elem.append(...node);
                this.#multiNodes.set(i, node.length);
            } else {
                this.#elem.appendChild(node);
                nodeIdx++;
            }
        }

        this.#attrs = [];

        for (const attr of attrs) {
            if (typeof attr === "string") {
                const parts = attr.split("=");
                if (parts.length === 1) {
                    this.#setAttribute(parts[0], "");
                } else if (parts.length === 2) {
                    this.#setAttribute(parts[0], parts[1]);
                } else {
                    throw new Error(`Attribute '${attr}' is in invalid format`);
                }
            } else if (typeof attr === "object") {
                if (attr instanceof RibElementAttribute) {
                    this.#attrs.push(attr);

                    let value;
                    if (typeof attr.value === "function") {
                        value = attr.value();
                    } else if (attr.value instanceof State) {
                        value = attr.value.get();
                    } else {
                        throw new Error(`Unexpected type of value of RibElementAttribute: expected a function, or a State, but got ${typeof attr.value}`);
                    }

                    this.#setAttribute(attr.name, value);
                } else if (attr instanceof RibElementAttributeListener) {
                    this.#elem.addEventListener(attr.event, attr.callback);
                } else if (attr instanceof RibElementAttributeStyle) {
                    this.#attrs.push(attr);

                    for (const [name, value] of Object.entries(attr.decl)) {
                        if (typeof value === "string") {
                            this.#elem.style[name] = value;
                        } else if (typeof value === "function") {
                            this.#elem.style[name] = value();
                        } else if (value instanceof State) {
                            this.#elem.style[name] = value.get();
                        } else {
                            throw new Error(`Unexpected type of value of RibElementAttributeStyle: expected a string, function, or a State, but got ${typeof value}`);
                        }
                    }
                } else {
                    throw new Error(`Expected an object attribute to be an instance of 'ElementAttribute' class`);
                }
            } else {
                throw new Error(`Expected an attribute to be a string or object, but got ${typeof attr}`);
            }
        }
    }

    /**
     * @returns {HTMLElement}
     */
    get() {
        return this.#elem;
    }

    /**
     * @param {...State<any>} states
     */
    sub(...states) {
        for (const state of states) {
            state.addObserver(this);
        }
    }

    /**
     * @param {State<any>} state
     */
    notify(state) {
        for (let i = 0; i < this.#children.length; i++) {
            const { value, toNode } = this.#children[i];

            const nodeIdx = this.#indexTranslation.get(i);
            if (nodeIdx === undefined) {
                throw new Error(`Missing an index translation for child index ${i}`);
            }

            if (typeof value === "function" || (value instanceof State && value === state)) {
                const newNode = toNode();

                if (Array.isArray(newNode)) {
                    this.#notifyMultipleNode(newNode, i, nodeIdx);
                } else {
                    this.#elem.replaceChild(newNode, this.#elem.childNodes[nodeIdx]);
                }
            }
        }

        for (const attr of this.#attrs) {
            if (attr instanceof RibElementAttribute) {
                const { name, value } = attr;

                if (value instanceof State && value === state) {
                    this.#setAttribute(name, value.get());
                } else if (typeof value === "function") {
                    this.#setAttribute(name, value());
                }
            } else if (attr instanceof RibElementAttributeStyle) {
                for (const [name, value] of Object.entries(attr.decl)) {
                    if (typeof value === "string") {
                        this.#elem.style[name] = value;
                    } else if (typeof value === "function") {
                        this.#elem.style[name] = value();
                    } else if (value instanceof State && value === state) {
                        this.#elem.style[name] = value.get();
                    } else {
                        throw new Error("unreachable");
                    }
                }
            }
        }
    }

    /**
     * @param {string} name
     * @param {string} value
     */
    #setAttribute(name, value) {
        if (name in this.#elem) {
            this.#elem[name] = value;
        } else {
            this.#elem.setAttribute(name, value);
        }
    }

    /**
     * @param {Node[]} node
     * @param {number} i
     * @param {number} nodeIdx
     */
    #notifyMultipleNode(node, i, nodeIdx) {
        const nodeCount = this.#multiNodes.get(i);
        this.#multiNodes.set(i, node.length);

        if (nodeCount) {
            let n;
            for (n = 0; n < nodeCount; n++) {
                this.#elem.replaceChild(node[n], this.#elem.childNodes[nodeIdx + n]);
            }

            const repN = n;

            for (; n < node.length; n++) {
                this.#elem.appendChild(node[n]);
            }

            if (n !== repN) {
                for (let j = i + 1; j < this.#children.length; j++) {
                    const idx = this.#indexTranslation.get(j);
                    if (idx === undefined) {
                        throw new Error(`Missing an index translation for child index ${j}`);
                    }

                    this.#indexTranslation.set(j, idx + n);
                }
            }
        } else {
            this.#elem.append(...node);

            for (let j = i + 1; j < this.#children.length; j++) {
                const idx = this.#indexTranslation.get(j);
                if (idx === undefined) {
                    throw new Error(`Missing an index translation for child index ${j}`);
                }

                this.#indexTranslation.set(j, idx + node.length);
            }
        }

    }
}

/**
 * @typedef {{ [name: string]: string | (() => string) | State<string> }} RibStylesheetDecl
 */

class RibElementAttributeStyle {
    /** @type {RibStylesheetDecl} */
    decl;

    /**
     * @param {RibStylesheetDecl} decl
     */
    constructor(decl) {
        this.decl = decl;
    }
}

/**
 * @param {RibStylesheetDecl} decl
 * @returns {RibElementAttributeStyle}
 */
function style(decl) {
    return new RibElementAttributeStyle(decl);
}

class RibElementAttributeListener {
    /** @type {string} */
    event;
    /** @type {(ev: Event) => void} */
    callback;

    /**
     * @param {string} event
     * @param {(ev: Event) => void} callback
     */
    constructor(event, callback) {
        this.event = event;
        this.callback = callback;
    }
}

/**
 * @param {(ev: Event) => void} callback
 * @returns {RibElementAttributeListener}
 */
function onClick(callback) {
    return new RibElementAttributeListener("click", callback);
}

class RibElementAttribute {
    /** @type {string} */
    name;
    /** @type {State<string> | (() => string)} */
    value;

    /**
     * @param {string} name
     * @param {State<string> | (() => string)} value
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * @returns {string}
     */
    get() {
        if (this.value instanceof State) {
            return this.value.get();
        }

        // just assume function here
        return this.value();
    }
}

/**
 * @param {string} name
 * @param {State<string> | (() => string)} value
 */
function attr(name, value) {
    return new RibElementAttribute(name, value);
}

/**
 * @param {RibElementLike} rib
 * @returns {MorphRibElement}
 */
function ribify(rib) {
    if (typeof rib === "string" || typeof rib === "number") {
        const node = document.createTextNode(rib);
        return { value: rib, toNode: () => node };
    }

    if (typeof rib === "function") {
        return {
            value: rib,
            toNode: () => {
                const ribs = rib();
                if (Array.isArray(ribs)) {
                    return ribs.flatMap((r) => ribify(r).toNode());
                }

                return ribify(ribs).toNode();
            },
        };
    }

    if (rib instanceof State) {
        const node = document.createTextNode("");
        return {
            value: rib,
            toNode: () => {
                node.textContent = rib.get();
                return node;
            },
        };
    }

    if (rib instanceof RibElement) {
        return { value: rib, toNode: () => rib.get() };
    }

    throw new Error(`Unexpected type of argument to ribify: ${typeof rib} (${rib})`);
}
