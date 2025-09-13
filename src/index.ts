import promptSync from 'prompt-sync';

const prompt = promptSync();

const username: string = prompt("Enter your username: ");
console.log(unknowntypeExample(username))
const ageString: string = prompt("Enter your age: ");
const age: number = parseInt(ageString);
console.log(unknowntypeExample(age));

function unknowntypeExample(message: unknown): unknown {
debugger;
  if (typeof (message) === 'string') {
    return "my name is " + message;
  }
  if (typeof (message) === 'number') {
      return message * 4;
  }
  return "Unknown type";
}