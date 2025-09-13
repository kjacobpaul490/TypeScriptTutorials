import promptSync from 'prompt-sync';

const prompt = promptSync();



var names: string[] = ["John", "Jane", "Jim", "Jill"];

printNames();

/**
 * Print names
 */
function printNames() {
    var name = prompt("Enter a name: ");
    if (name === "exit") {
        console.log(names);
    }
    else {
        names.push(name);
        printNames();
    }
}

