import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Type Inference & Type Annotations ===\n");

// 1. TYPE INFERENCE - TypeScript automatically infers types
console.log("1. TYPE INFERENCE:");
console.log("TypeScript automatically determines types when you don't specify them\n");

// TypeScript infers this as 'string'
let message = "Hello World";
console.log(`message type: ${typeof message} - value: "${message}"`);

// TypeScript infers this as 'number'
let count = 42;
console.log(`count type: ${typeof count} - value: ${count}`);

// TypeScript infers this as 'boolean'
let isActive = true;
console.log(`isActive type: ${typeof isActive} - value: ${isActive}`);

// TypeScript infers this as 'number[]'
let numbers = [1, 2, 3, 4, 5];
console.log(`numbers type: array - value: [${numbers.join(', ')}]`);

// TypeScript infers this as 'object' with specific properties
let person = {
    name: "John",
    age: 30,
    isStudent: false
};
console.log(`person type: object - value:`, person);

console.log("\n" + "=".repeat(50) + "\n");

// 2. TYPE ANNOTATIONS - Explicitly specifying types
console.log("2. TYPE ANNOTATIONS:");
console.log("Explicitly telling TypeScript what type a variable should be\n");

// Explicit type annotations
let explicitString: string = "TypeScript";
let explicitNumber: number = 100;
let explicitBoolean: boolean = false;
let explicitArray: number[] = [10, 20, 30];
let explicitObject: { name: string; age: number } = { name: "Alice", age: 25 };

console.log(`explicitString: ${explicitString}`);
console.log(`explicitNumber: ${explicitNumber}`);
console.log(`explicitBoolean: ${explicitBoolean}`);
console.log(`explicitArray: [${explicitArray.join(', ')}]`);
console.log(`explicitObject:`, explicitObject);

console.log("\n" + "=".repeat(50) + "\n");

// 3. FUNCTION TYPE ANNOTATIONS
console.log("3. FUNCTION TYPE ANNOTATIONS:");

// Function with explicit parameter and return types
function addNumbers(a: number, b: number): number {
    return a + b;
}

// Function with optional parameters
function greetUser(name: string, age?: number): string {
    if (age) {
        return `Hello ${name}, you are ${age} years old!`;
    }
    return `Hello ${name}!`;
}

// Function with default parameters
function createUser(name: string, role: string = "user"): string {
    return `User: ${name}, Role: ${role}`;
}

console.log(`addNumbers(5, 3): ${addNumbers(5, 3)}`);
console.log(`greetUser("Bob"): ${greetUser("Bob")}`);
console.log(`greetUser("Bob", 25): ${greetUser("Bob", 25)}`);
console.log(`createUser("Alice"): ${createUser("Alice")}`);
console.log(`createUser("Alice", "admin"): ${createUser("Alice", "admin")}`);

console.log("\n" + "=".repeat(50) + "\n");

// 4. UNION TYPES
console.log("4. UNION TYPES:");

let id: string | number;
id = "ABC123";
console.log(`id as string: ${id}`);
id = 12345;
console.log(`id as number: ${id}`);

// Function that accepts union types
function processId(input: string | number): string {
    if (typeof input === "string") {
        return `String ID: ${input.toUpperCase()}`;
    } else {
        return `Number ID: ${input.toString()}`;
    }
}

console.log(`processId("abc123"): ${processId("abc123")}`);
console.log(`processId(12345): ${processId(12345)}`);

console.log("\n" + "=".repeat(50) + "\n");

// 5. INTERFACES AND TYPE ALIASES
console.log("5. INTERFACES AND TYPE ALIASES:");

// Interface definition
interface User {
    id: number;
    name: string;
    email: string;
    isActive?: boolean; // Optional property
}

// Type alias
type Status = "pending" | "approved" | "rejected";

// Using interface and type alias
let currentUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true
};

let userStatus: Status = "pending";

console.log("User object:", currentUser);
console.log(`User status: ${userStatus}`);

console.log("\n" + "=".repeat(50) + "\n");

// 6. INTERACTIVE EXAMPLE
console.log("6. INTERACTIVE EXAMPLE:");
console.log("Let's see type inference and annotations in action!\n");

let userName: string = prompt("Enter your name: ");
let userAge: number = parseInt(prompt("Enter your age: "));
let isStudent: boolean = prompt("Are you a student? (y/n): ").toLowerCase() === "y";



// TypeScript infers the return type based on the return statement
function createUserProfile(name: string, age: number, student: boolean) {
    return {
        name: name,
        age: age,
        isStudent: student,
        category: age < 18 ? "Minor" : age < 65 ? "Adult" : "Senior"
    };
}

let profile = createUserProfile(userName, userAge, isStudent);
console.log("\nYour profile:", profile);

console.log("\n" + "=".repeat(50) + "\n");
console.log("Key Takeaways:");
console.log("• Type inference: TypeScript automatically determines types");
console.log("• Type annotations: Explicitly specify types with : type");
console.log("• Use inference when types are obvious");
console.log("• Use annotations for clarity and strict typing");
console.log("• Union types allow multiple possible types");
console.log("• Interfaces define object shapes");
console.log("• Type aliases create custom type names");
