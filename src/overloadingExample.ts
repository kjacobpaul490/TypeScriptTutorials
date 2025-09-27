import promptSync from 'prompt-sync';


const prompt = promptSync();


const firstName: string = prompt("Enter first Name: ");

const lastName: string = prompt("Enter second Name: ");

console.log(validateNumbers(firstName, lastName));

const firstNumber: number = Number(prompt("Enter firstNumber: "));

const secondNumber: number = Number(prompt("Enter secondNumber: "));

console.log(validateNumbers(firstNumber, secondNumber));
console.log(validateNumbers(firstNumber, firstName));

const isStudent: boolean = Boolean(prompt("Enter firstNumber: "));
console.log(validateNumbers(firstNumber, isStudent));
function validateNumbers(firstNumber: number | string, secondNumber: number | string|boolean): number | string | boolean
{

    if (typeof (firstNumber) == 'number' && typeof (secondNumber) == 'number')
        return firstNumber+secondNumber;

    if (typeof (firstNumber) == 'string' && typeof (secondNumber) == 'string' )
        return `${firstNumber} ${secondNumber}`;

    return false;
}







