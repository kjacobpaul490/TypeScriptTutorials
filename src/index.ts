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



function add(a:number[]){
  return a;
}
function addRest(...a:number[]){
  return a;
}


add([1,2,4,5,]);
addRest(1,2,3,4,5)