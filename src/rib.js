/**
 * @template T
 */
class State {
    /** @type {Element} */
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
            this.#value = value(this);
        } else {
            this.#value = value;
        }

        for (const obs of this.#observers) {
            obs.notify(this);
        }
    }

    /**
     * @param {Element} obs
     */
    addObserver(obs) {
        this.#observers.push(obs);
    }
}

/**
 * @typedef {Element | string | (() => RibElement) | State<unknown>} RibElement
 */

class Element {
    /** @type {HTMLElement} */
    #elem;
    /** @type {(ElementAttribute | ElementAttributeStyle)[]} */
    #attrs;
    /** @type {{ value: RibElement; toNode: () => Node }[]} */
    #children;

    /**
     * @param {string} name
     * @param {(ElementAttribute | ElementAttributeStyle)[]} attrs
     * @param {RibElement[]} children
     */
    constructor(name, attrs, children) {
        this.#elem = document.createElement(name);

        this.#children = children.map(ribify);

        for (const { toNode } of this.#children) {
            const node = toNode();
            this.#elem.appendChild(toNode());
        }

        this.#attrs = [];

        // TODO: better error messages here
        for (const attr of attrs) {
            if (typeof attr === "string") {
                const parts = attr.split("=");
                if (parts.length === 1) {
                    this.#elem.setAttribute(parts[0], true);
                } else if (parts.length === 2) {
                    this.#elem.setAttribute(parts[0], parts[1]);
                } else {
                    throw new Error(`Attribute '${attr}' is in invalid format`);
                }
            } else if (typeof attr === "object") {
                if (attr instanceof ElementAttribute) {
                    this.#attrs.push(attr);

                    let value;
                    if (typeof attr.value === "function") {
                        value = attr.value();
                    } else if (attr.value instanceof State) {
                        value = attr.value.get();
                    } else {
                        throw new Error("foo");
                    }

                    this.#elem.setAttribute(attr.name, value);
                } else if (attr instanceof ElementAttributeListener) {
                    this.#elem.addEventListener(attr.event, attr.callback);
                } else if (attr instanceof ElementAttributeStyle) {
                    this.#attrs.push(attr);

                    for (const [name, value] of Object.entries(attr.decl)) {
                        if (typeof value === "string") {
                            this.#elem.style[name] = value;
                        } else if (typeof value === "function") {
                            this.#elem.style[name] = value();
                        } else if (value instanceof State) {
                            this.#elem.style[name] = value.get();
                        } else {
                            throw new Error("bar");
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
     * @param {...State<unknown>} states
     */
    sub(...states) {
        for (const state of states) {
            state.addObserver(this);
        }
    }

    /**
     * @param {State<unknown>} state
     */
    notify(state) {
        for (let i = 0; i < this.#children.length; i++) {
            const { value, toNode } = this.#children[i];

            if (value instanceof State && value === state) {
                this.#elem.replaceChild(this.#elem.childNodes[i], toNode());
            } else if (typeof value === "function") {
                this.#elem.replaceChild(this.#elem.childNodes[i], toNode());
            }
        }

        for (const attr of this.#attrs) {
            if (attr instanceof ElementAttribute) {
                const { name, value } = attr;

                if (value instanceof State && value === state) {
                    this.#elem.setAttribute(name, value.get());
                } else if (typeof value === "function") {
                    this.#elem.setAttribute(name, value());
                }
            } else if (attr instanceof ElementAttributeStyle) {
                for (const [name, value] of Object.entries(attr.decl)) {
                    if (typeof value === "string") {
                        this.#elem.style[name] = value;
                    } else if (typeof value === "function") {
                        this.#elem.style[name] = value();
                    } else if (value instanceof State && value === state) {
                        console.log({ name, value });
                        this.#elem.style[name] = value.get();
                    } else {
                        throw new Error("unreachable");
                    }
                }
            }
        }
    }
}

/**
 * @typedef {{ [string]: string | (() => string) | State<string> }} RibStylesheetDecl
 */

class ElementAttributeStyle {
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
 * @returns {ElementAttributeStyle}
 */
function style(decl) {
    return new ElementAttributeStyle(decl);
}

class ElementAttributeListener {
    /** @type {string} */
    event;
    /** @type {(Event) => void} */
    callback;

    /**
     * @param {string} event
     * @param {(Event) => void} callback
     */
    constructor(event, callback) {
        this.event = event;
        this.callback = callback;
    }
}

/**
 * @param {(Event) => void} callback
 * @returns {ElementAttributeListener}
 */
function onClick(callback) {
    return new ElementAttributeListener("click", callback);
}

class ElementAttribute {
    /** @type {string} */
    name;
    /** @type {State<string> | () => string} */
    value;

    /**
     * @param {string} name
     * @param {State<string> | () => string} value
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
 * @param {RibElement} rib
 * @returns {{ value: RibElement; toNode: () => Node }}
 */
function ribify(rib) {
    if (typeof rib === "string") {
        const node = document.createTextNode(rib);
        return { value: rib, toNode: () => node };
    }

    if (typeof rib === "function") {
        return {
            value: rib,
            toNode: () => morph(rib()),
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

    if (rib instanceof Element) {
        return { value: rib, toNode: () => rib.get() };
    }

    throw new Error(`Unexpected type of argument to morph`);
}
