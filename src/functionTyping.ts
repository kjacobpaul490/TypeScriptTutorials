import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Function Typing ===\n");

// 1. BASIC FUNCTION TYPING
console.log("1. BASIC FUNCTION TYPING:");
console.log("=".repeat(40));

// Function with explicit parameter and return types
function addNumbers(a: number, b: number): number {
    return a + b;
}

// Function with string parameters and return type
function greetUser(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old!`;
}

// Function with boolean return type
function isEven(num: number): boolean {
    return num % 2 === 0;
}

console.log(`addNumbers(5, 3): ${addNumbers(5, 3)}`);
console.log(`greetUser("Alice", 25): ${greetUser("Alice", 25)}`);
console.log(`isEven(4): ${isEven(4)}`);
console.log(`isEven(7): ${isEven(7)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 2. OPTIONAL PARAMETERS
console.log("2. OPTIONAL PARAMETERS:");
console.log("Use ? to make parameters optional\n");

function createUser(name: string, email: string, age?: number): string {
    if (age) {
        return `User: ${name}, Email: ${email}, Age: ${age}`;
    }
    return `User: ${name}, Email: ${email}`;
}

function calculateArea(length: number, width?: number): number {
    if (width) {
        return length * width; // Rectangle
    }
    return length * length; // Square
}

console.log(`createUser("John", "john@example.com"): ${createUser("John", "john@example.com")}`);
console.log(`createUser("Jane", "jane@example.com", 30): ${createUser("Jane", "jane@example.com", 30)}`);
console.log(`calculateArea(5): ${calculateArea(5)}`);
console.log(`calculateArea(5, 3): ${calculateArea(5, 3)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 3. DEFAULT PARAMETERS
console.log("3. DEFAULT PARAMETERS:");
console.log("Provide default values for parameters\n");

function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

function createMessage(text: string, prefix: string = "[INFO]", suffix: string = "!"): string {
    return `${prefix} ${text}${suffix}`;
}

console.log(`greet("Alice"): ${greet("Alice")}`);
console.log(`greet("Bob", "Hi"): ${greet("Bob", "Hi")}`);
console.log(`createMessage("Task completed"): ${createMessage("Task completed")}`);
console.log(`createMessage("Error occurred", "[ERROR]", "!!!"): ${createMessage("Error occurred", "[ERROR]", "!!!")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 4. REST PARAMETERS
console.log("4. REST PARAMETERS:");
console.log("Use ... to accept variable number of arguments\n");

function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

function formatNames(prefix: string, ...names: string[]): string {
    return names.map(name => `${prefix} ${name}`).join(", ");
}

console.log(`sum(1, 2, 3, 4, 5): ${sum(1, 2, 3, 4, 5)}`);
console.log(`sum(10, 20): ${sum(10, 20)}`);
console.log(`formatNames("Mr.", "John", "Jane", "Bob"): ${formatNames("Mr.", "John", "Jane", "Bob")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. FUNCTION TYPES AND INTERFACES
console.log("5. FUNCTION TYPES AND INTERFACES:");

// Function type alias
type MathOperation = (a: number, b: number) => number;

// Interface with function properties
interface Calculator {
    add: MathOperation;
    subtract: MathOperation;
    multiply: MathOperation;
    divide: MathOperation;
}

// Implementation of Calculator interface
const calculator: Calculator = {
    add: (a: number, b: number): number => a + b,
    subtract: (a: number, b: number): number => a - b,
    multiply: (a: number, b: number): number => a * b,
    divide: (a: number, b: number): number => a / b
};

console.log(`calculator.add(10, 5): ${calculator.add(10, 5)}`);
console.log(`calculator.subtract(10, 5): ${calculator.subtract(10, 5)}`);
console.log(`calculator.multiply(10, 5): ${calculator.multiply(10, 5)}`);
console.log(`calculator.divide(10, 5): ${calculator.divide(10, 5)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 6. HIGHER-ORDER FUNCTIONS
console.log("6. HIGHER-ORDER FUNCTIONS:");
console.log("Functions that take or return other functions\n");

// Function that takes a function as parameter
function processArray<T>(arr: T[], processor: (item: T) => T): T[] {
    return arr.map(processor);
}

// Function that returns a function
function createMultiplier(factor: number): (value: number) => number {
    return (value: number): number => value * factor;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (x: number) => x * 2);
const tripler = createMultiplier(3);

console.log(`Original array: [${numbers.join(', ')}]`);
console.log(`Doubled array: [${doubled.join(', ')}]`);
console.log(`tripler(5): ${tripler(5)}`);
console.log(`tripler(10): ${tripler(10)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 7. UNION TYPES IN FUNCTIONS
console.log("7. UNION TYPES IN FUNCTIONS:");

function processId(id: string | number): string {
    if (typeof id === "string") {
        return `String ID: ${id.toUpperCase()}`;
    } else {
        return `Number ID: ${id.toString()}`;
    }
}

function formatValue(value: string | number | boolean): string {
    switch (typeof value) {
        case "string":
            return `String: "${value}"`;
        case "number":
            return `Number: ${value}`;
        case "boolean":
            return `Boolean: ${value}`;
        default:
            return "Unknown type";
    }
}

console.log(`processId("abc123"): ${processId("abc123")}`);
console.log(`processId(12345): ${processId(12345)}`);
console.log(`formatValue("Hello"): ${formatValue("Hello")}`);
console.log(`formatValue(42): ${formatValue(42)}`);
console.log(`formatValue(true): ${formatValue(true)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 8. GENERIC FUNCTIONS
console.log("8. GENERIC FUNCTIONS:");

function identity<T>(arg: T): T {
    return arg;
}

function getFirstItem<T>(items: T[]): T | undefined {
    return items[0];
}

function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

console.log(`identity<string>("Hello"): ${identity<string>("Hello")}`);
console.log(`identity<number>(42): ${identity<number>(42)}`);
console.log(`getFirstItem([1, 2, 3]): ${getFirstItem([1, 2, 3])}`);
console.log(`getFirstItem(["a", "b", "c"]): ${getFirstItem(["a", "b", "c"])}`);
console.log(`createPair("Hello", 42): [${createPair("Hello", 42).join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 9. ASYNC FUNCTIONS
console.log("9. ASYNC FUNCTIONS:");

async function fetchUserData(id: number): Promise<{ id: number; name: string; email: string }> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `User ${id}`,
                email: `user${id}@example.com`
            });
        }, 1000);
    });
}

async function processUsers(): Promise<void> {
    console.log("Fetching user data...");
    const user1 = await fetchUserData(1);
    const user2 = await fetchUserData(2);
    
    console.log(`User 1:`, user1);
    console.log(`User 2:`, user2);
}

// Run async function
processUsers().then(() => {
    console.log("Async processing completed!");
});

console.log("\n" + "=".repeat(60) + "\n");

// 10. INTERACTIVE EXAMPLE
console.log("10. INTERACTIVE EXAMPLE:");

// Function with complex typing
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

type UserValidator = (user: User) => boolean;
type UserProcessor = (user: User) => string;

function validateUser(user: User): boolean {
    return user.id > 0 && user.name.length > 0 && user.email.includes("@");
}

function formatUser(user: User): string {
    const ageInfo = user.age ? `, Age: ${user.age}` : "";
    return `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}${ageInfo}`;
}

function processUser(user: User, validator: UserValidator, processor: UserProcessor): string | null {
    if (validator(user)) {
        return processor(user);
    }
    return null;
}

// Get user input
const userId = parseInt(prompt("Enter user ID: "));
const userName = prompt("Enter user name: ");
const userEmail = prompt("Enter user email: ");
const userAgeInput = prompt("Enter user age (optional): ");
const userAge = userAgeInput ? parseInt(userAgeInput) : undefined;

const user: User = {
    id: userId,
    name: userName,
    email: userEmail,
    age: userAge
};

console.log("\nProcessing user...");
const result = processUser(user, validateUser, formatUser);

if (result) {
    console.log("✅ Valid user:", result);
} else {
    console.log("❌ Invalid user data");
}

console.log("\n" + "=".repeat(60) + "\n");
console.log("FUNCTION TYPING SUMMARY:");
console.log("=".repeat(30));
console.log("• Basic: function name(param: type): returnType");
console.log("• Optional: function name(param?: type): returnType");
console.log("• Default: function name(param: type = value): returnType");
console.log("• Rest: function name(...params: type[]): returnType");
console.log("• Function types: type Name = (param: type) => returnType");
console.log("• Generics: function name<T>(param: T): T");
console.log("• Async: async function name(): Promise<type>");
console.log("• Union types: function name(param: type1 | type2): returnType");
