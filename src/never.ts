import promptSync from 'prompt-sync';

const prompt = promptSync();

const a: number = parseInt(prompt("Enter the first number: "));
const b: number = parseInt(prompt("Enter the second number: "));

console.log(MathematicalOperation(a, b));

function MathematicalOperation(a: number, b: number): number {
    if (b === 0) {
        return neverFunction();
    }
    return a / b;
}

function neverFunction(): never {
    throw new Error("This function will never return");
}

