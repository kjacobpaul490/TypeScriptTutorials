import promptSync from 'prompt-sync';

const prompt = promptSync();



var userDetails: [string,number, boolean][] = []; 

printNames();

/**
 * Print names
 */
function printNames() {
    console.log("Enter user details");
    let name:string = prompt("Enter a name: ");
    if (name === "exit") {
        console.log(userDetails.flat());
    }
    else {
        let age:number = parseInt(prompt("Enter age: "));
        let isStudent:boolean = prompt("Enter isStudent (true/false): ").toLowerCase() === "true";
        userDetails.push([name, age, isStudent]);
        printNames();
    }
}