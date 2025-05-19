interface Container<T> {
    value: T;
}

function getValue<T>(container: Container<T>): T {
    return container.value;
}

const numberContainer = { value: 42 };
console.log(getValue(numberContainer));

const stringContainer = { value: "Hello, TypeScript!" };
console.log(getValue(stringContainer));

const objectContainer = {
    value: { name: "Alice", age: 30 }
};
console.log(getValue(objectContainer));

const arrayContainer = {
    value: [1, 2, 3, 4, 5]
};
console.log(getValue(arrayContainer));