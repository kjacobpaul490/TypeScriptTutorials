import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Rest Parameters ===\n");

// 1. BASIC REST PARAMETERS
console.log("1. BASIC REST PARAMETERS:");
console.log("Use ... to accept variable number of arguments\n");

// Function with rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// Function with rest parameters for strings
function concatenate(...strings: string[]): string {
    return strings.join(" ");
}

// Function with rest parameters for mixed types
function logValues(...values: any[]): void {
    values.forEach((value, index) => {
        console.log(`Value ${index + 1}: ${value} (type: ${typeof value})`);
    });
}

console.log(`sum(1, 2, 3, 4, 5): ${sum(1, 2, 3, 4, 5)}`);
console.log(`sum(10, 20): ${sum(10, 20)}`);
console.log(`sum(): ${sum()}`);

console.log(`concatenate("Hello", "World", "from", "TypeScript"): ${concatenate("Hello", "World", "from", "TypeScript")}`);
console.log(`concatenate("Single"): ${concatenate("Single")}`);

console.log("logValues with mixed types:");
logValues("Hello", 42, true, [1, 2, 3], { name: "John" });

console.log("\n" + "=".repeat(60) + "\n");

// 2. REST PARAMETERS WITH OTHER PARAMETERS
console.log("2. REST PARAMETERS WITH OTHER PARAMETERS:");
console.log("Rest parameters must be the last parameter\n");

// Function with required parameter and rest parameters
function greetWithNames(greeting: string, ...names: string[]): string {
    if (names.length === 0) {
        return `${greeting}!`;
    }
    return `${greeting}, ${names.join(", ")}!`;
}

// Function with optional parameter and rest parameters
function createList(title: string, ...items: string[]): string {
    let result = `${title}:\n`;
    items.forEach((item, index) => {
        result += `${index + 1}. ${item}\n`;
    });
    return result;
}

// Function with default parameter and rest parameters
function formatMessage(prefix: string = "[INFO]", ...messages: string[]): string {
    return `${prefix} ${messages.join(" ")}`;
}

console.log(`greetWithNames("Hello"): ${greetWithNames("Hello")}`);
console.log(`greetWithNames("Hello", "Alice", "Bob", "Charlie"): ${greetWithNames("Hello", "Alice", "Bob", "Charlie")}`);

console.log(`createList("Shopping List", "Milk", "Bread", "Eggs"):`);
console.log(createList("Shopping List", "Milk", "Bread", "Eggs"));

console.log(`formatMessage("Hello", "World", "from", "TypeScript"): ${formatMessage("Hello", "World", "from", "TypeScript")}`);
console.log(`formatMessage("Hello", "World"): ${formatMessage("Hello", "World")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 3. REST PARAMETERS WITH ARRAYS
console.log("3. REST PARAMETERS WITH ARRAYS:");

// Function that processes arrays using rest parameters
function mergeArrays<T>(...arrays: T[][]): T[] {
    return arrays.flat();
}

// Function that finds common elements
function findCommon<T>(...arrays: T[][]): T[] {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0] || [];
    
    return (arrays[0] || []).filter(item => 
        arrays.every(array => array.includes(item))
    );
}

// Function that combines arrays with different operations
function combineArrays<T>(operation: "merge" | "intersect" | "union", ...arrays: T[][]): T[] {
    switch (operation) {
        case "merge":
            return arrays.flat();
        case "intersect":
            return findCommon(...arrays);
        case "union":
            return [...new Set(arrays.flat())];
        default:
            return [];
    }
}

const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const arr3 = [5, 6, 7];

console.log(`mergeArrays([1, 2, 3], [4, 5, 6], [7, 8, 9]): [${mergeArrays([1, 2, 3], [4, 5, 6], [7, 8, 9]).join(', ')}]`);
console.log(`findCommon([1, 2, 3], [3, 4, 5], [3, 6, 7]): [${findCommon([1, 2, 3], [3, 4, 5], [3, 6, 7]).join(', ')}]`);

console.log(`combineArrays("merge", arr1, arr2, arr3): [${combineArrays("merge", arr1, arr2, arr3).join(', ')}]`);
console.log(`combineArrays("intersect", arr1, arr2, arr3): [${combineArrays("intersect", arr1, arr2, arr3).join(', ')}]`);
console.log(`combineArrays("union", arr1, arr2, arr3): [${combineArrays("union", arr1, arr2, arr3).join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 4. REST PARAMETERS WITH OBJECTS
console.log("4. REST PARAMETERS WITH OBJECTS:");

// Interface for user data
interface UserData {
    id: number;
    name: string;
    email: string;
}

// Function that processes multiple user objects
function processUsers(...users: UserData[]): string {
    return users.map(user => `${user.name} (${user.email})`).join(", ");
}

// Function that merges multiple objects
function mergeObjects(...objects: Record<string, any>[]): Record<string, any> {
    return objects.reduce((merged, obj) => ({ ...merged, ...obj }), {});
}

// Function that validates multiple objects
function validateObjects<T>(validator: (obj: T) => boolean, ...objects: T[]): T[] {
    return objects.filter(validator);
}

const user1: UserData = { id: 1, name: "Alice", email: "alice@example.com" };
const user2: UserData = { id: 2, name: "Bob", email: "bob@example.com" };
const user3: UserData = { id: 3, name: "Charlie", email: "charlie@example.com" };

console.log(`processUsers(user1, user2, user3): ${processUsers(user1, user2, user3)}`);

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, f: 6 };

console.log(`mergeObjects(obj1, obj2, obj3):`, mergeObjects(obj1, obj2, obj3));

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = validateObjects((num: number) => num % 2 === 0, ...numberArray);
console.log(`evenNumbers from 1-10: [${evenNumbers.join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. REST PARAMETERS WITH GENERICS
console.log("5. REST PARAMETERS WITH GENERICS:");

// Generic function with rest parameters
function createTuple<T, U>(...items: [T, U][]): [T, U][] {
    return items;
}

// Generic function that processes multiple items
function processItems<T>(processor: (item: T) => T, ...items: T[]): T[] {
    return items.map(processor);
}

// Generic function that finds maximum value
function findMax<T extends number | string>(...values: T[]): T | undefined {
    if (values.length === 0) return undefined;
    
    return values.reduce((max, current) => 
        current > max ? current : max
    );
}

// Generic function that creates a map from key-value pairs
function createMap<K, V>(...pairs: [K, V][]): Map<K, V> {
    return new Map(pairs);
}

console.log(`createTuple(["a", 1], ["b", 2], ["c", 3]):`, createTuple(["a", 1], ["b", 2], ["c", 3]));

const doubled = processItems((x: number) => x * 2, 1, 2, 3, 4, 5);
console.log(`processItems (double): [${doubled.join(', ')}]`);

const uppercased = processItems((s: string) => s.toUpperCase(), "hello", "world", "typescript");
console.log(`processItems (uppercase): [${uppercased.join(', ')}]`);

console.log(`findMax(1, 5, 3, 9, 2): ${findMax(1, 5, 3, 9, 2)}`);
console.log(`findMax("apple", "banana", "cherry"): ${findMax("apple", "banana", "cherry")}`);

const userMap = createMap(["alice", 25], ["bob", 30], ["charlie", 35]);
console.log(`createMap:`, userMap);

console.log("\n" + "=".repeat(60) + "\n");

// 6. REST PARAMETERS WITH FUNCTION TYPES
console.log("6. REST PARAMETERS WITH FUNCTION TYPES:");

// Function that accepts multiple functions and executes them
function executeFunctions<T>(...functions: (() => T)[]): T[] {
    return functions.map(fn => fn());
}

// Function that chains multiple functions
function chainFunctions<T>(initialValue: T, ...functions: ((value: T) => T)[]): T {
    return functions.reduce((value, fn) => fn(value), initialValue);
}

// Function that validates with multiple validators
function validateWithMultiple<T>(value: T, ...validators: ((val: T) => boolean)[]): boolean {
    return validators.every(validator => validator(value));
}

const results = executeFunctions(
    () => "Hello",
    () => "42",
    () => "true",
    () => "[1, 2, 3]"
);
console.log(`executeFunctions results:`, results);

const chained = chainFunctions(
    5,
    (x: number) => x * 2,
    (x: number) => x + 10,
    (x: number) => x / 2
);
console.log(`chainFunctions(5): ${chained}`);

const isValid = validateWithMultiple(
    "hello@example.com",
    (email: string) => email.includes("@"),
    (email: string) => email.includes("."),
    (email: string) => email.length > 5
);
console.log(`validateWithMultiple("hello@example.com"): ${isValid}`);

console.log("\n" + "=".repeat(60) + "\n");

// 7. REST PARAMETERS WITH SPREAD OPERATOR
console.log("7. REST PARAMETERS WITH SPREAD OPERATOR:");

// Function that accepts arrays and spreads them
function combineWithSpread<T>(...arrays: T[][]): T[] {
    return arrays.flat();
}

// Function that spreads rest parameters into another function
function delegateToFunction<T>(fn: (...args: T[]) => void, ...args: T[]): void {
    fn(...args);
}

// Function that processes spread arguments
function processSpreadArgs<T>(...args: T[]): { count: number; items: T[]; first: T | undefined; last: T | undefined } {
    return {
        count: args.length,
        items: args,
        first: args[0],
        last: args[args.length - 1]
    };
}

const spreadResult = combineWithSpread([1, 2], [3, 4], [5, 6]);
console.log(`combineWithSpread: [${spreadResult.join(', ')}]`);

delegateToFunction((...nums: number[]) => {
    console.log(`delegateToFunction received: [${nums.join(', ')}]`);
}, 1, 2, 3, 4, 5);

const spreadInfo = processSpreadArgs("a", "b", "c", "d", "e");
console.log(`processSpreadArgs info:`, spreadInfo);

console.log("\n" + "=".repeat(60) + "\n");

// 8. INTERACTIVE EXAMPLE
console.log("8. INTERACTIVE EXAMPLE:");

// Function for calculating statistics
function calculateStats(...numbers: number[]): {
    sum: number;
    average: number;
    min: number;
    max: number;
    count: number;
} {
    if (numbers.length === 0) {
        return { sum: 0, average: 0, min: 0, max: 0, count: 0 };
    }
    
    const sum = numbers.reduce((total, num) => total + num, 0);
    const average = sum / numbers.length;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    
    return { sum, average, min, max, count: numbers.length };
}

// Function for creating a sentence from words
function createSentence(...words: string[]): string {
    if (words.length === 0) return "";
    if (words.length === 1) return words[0] || "";
    
    const lastWord = words[words.length - 1];
    const otherWords = words.slice(0, -1);
    
    return `${otherWords.join(", ")} and ${lastWord}`;
}

// Get user input
console.log("Enter numbers separated by spaces (e.g., 1 2 3 4 5):");
const numberInput = prompt("Numbers: ");
const inputNumbers = numberInput.split(" ").map(n => parseFloat(n)).filter(n => !isNaN(n));

console.log("\nEnter words to create a sentence:");
const wordInput = prompt("Words: ");
const words = wordInput.split(" ").filter(word => word.trim() !== "");

// Process the inputs
console.log("\nResults:");
if (inputNumbers.length > 0) {
    const stats = calculateStats(...inputNumbers);
    console.log(`Statistics for [${inputNumbers.join(', ')}]:`);
    console.log(`  Sum: ${stats.sum}`);
    console.log(`  Average: ${stats.average.toFixed(2)}`);
    console.log(`  Min: ${stats.min}`);
    console.log(`  Max: ${stats.max}`);
    console.log(`  Count: ${stats.count}`);
} else {
    console.log("No valid numbers entered.");
}

if (words.length > 0) {
    const sentence = createSentence(...words);
    console.log(`Sentence: ${sentence}`);
} else {
    console.log("No words entered.");
}

console.log("\n" + "=".repeat(60) + "\n");
console.log("REST PARAMETERS SUMMARY:");
console.log("=".repeat(30));
console.log("• Syntax: function name(...paramName: type[])");
console.log("• Must be the last parameter in the function");
console.log("• Collects all remaining arguments into an array");
console.log("• Type is always an array of the specified type");
console.log("• Can be used with any type: number[], string[], T[], etc.");
console.log("• Works with generics for type safety");
console.log("• Can be combined with other parameter types");
console.log("• Use spread operator (...) to pass arrays as rest parameters");
