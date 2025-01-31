const num = new State(0);
const numbers = new State([]);

const incButton = button(
    [],
    [
        onClick(() => {
            num.update((n) => n + 1);
            numbers.get().push(num.get());
            numbers.update(numbers.get());
        }),
    ],
    "+"
);

const decButton = button(
    [],
    [
        onClick(() => {
            num.update((n) => n - 1);
            numbers.get().push(num.get());
            numbers.update(numbers.get());
        }),
    ],
    "-"
);

const numbersDiv = div(
    [numbers],
    [],
    () => numbers.get().map((n) => p([], [], n)),
);

document.body.append(
    incButton.get(),
    decButton.get(),
    numbersDiv.get(),
);
