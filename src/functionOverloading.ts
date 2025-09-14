import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Function Overloading ===\n");

// 1. BASIC FUNCTION OVERLOADING
console.log("1. BASIC FUNCTION OVERLOADING:");
console.log("Define multiple function signatures, then implement with union types\n");

// Function overloads - multiple signatures
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: boolean): string;
// Implementation signature (not visible to callers)
function processValue(value: string | number | boolean): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else if (typeof value === "number") {
        return value * 2;
    } else {
        return value ? "TRUE" : "FALSE";
    }
}

console.log(`processValue("hello"): ${processValue("hello")}`);
console.log(`processValue(42): ${processValue(42)}`);
console.log(`processValue(true): ${processValue(true)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 2. OVERLOADING WITH DIFFERENT PARAMETER COUNTS
console.log("2. OVERLOADING WITH DIFFERENT PARAMETER COUNTS:");

// Function overloads with different parameter counts
function createUser(name: string): { name: string; id: number };
function createUser(name: string, email: string): { name: string; email: string; id: number };
function createUser(name: string, email: string, age: number): { name: string; email: string; age: number; id: number };
// Implementation
function createUser(name: string, email?: string, age?: number): { name: string; email?: string; age?: number; id: number } {
    const id = Math.floor(Math.random() * 1000);
    const user: any = { name, id };
    
    if (email !== undefined) {
        user.email = email;
    }
    if (age !== undefined) {
        user.age = age;
    }
    
    return user;
}

console.log(`createUser("Alice"):`, createUser("Alice"));
console.log(`createUser("Bob", "bob@example.com"):`, createUser("Bob", "bob@example.com"));
console.log(`createUser("Charlie", "charlie@example.com", 30):`, createUser("Charlie", "charlie@example.com", 30));

console.log("\n" + "=".repeat(60) + "\n");

// 3. OVERLOADING WITH DIFFERENT RETURN TYPES
console.log("3. OVERLOADING WITH DIFFERENT RETURN TYPES:");

// Function overloads with different return types
function parseInput(input: string): string;
function parseInput(input: number): number;
function parseInput(input: boolean): boolean;
function parseInput(input: string | number | boolean): string | number | boolean {
    if (typeof input === "string") {
        return input.trim().toLowerCase();
    } else if (typeof input === "number") {
        return Math.abs(input);
    } else {
        return !input;
    }
}

console.log(`parseInput("  HELLO  "): ${parseInput("  HELLO  ")}`);
console.log(`parseInput(-42): ${parseInput(-42)}`);
console.log(`parseInput(true): ${parseInput(true)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 4. OVERLOADING WITH ARRAYS
console.log("4. OVERLOADING WITH ARRAYS:");

// Function overloads for array operations
function getFirstItem(items: string[]): string | undefined;
function getFirstItem(items: number[]): number | undefined;
function getFirstItem(items: boolean[]): boolean | undefined;
function getFirstItem(items: any[]): any {
    return items.length > 0 ? items[0] : undefined;
}

function processArray(items: string[]): string[];
function processArray(items: number[]): number[];
function processArray(items: boolean[]): boolean[];
function processArray(items: any[]): any[] {
    if (items.length === 0) return [];
    
    if (typeof items[0] === "string") {
        return items.map(item => (item as string).toUpperCase());
    } else if (typeof items[0] === "number") {
        return items.map(item => (item as number) * 2);
    } else if (typeof items[0] === "boolean") {
        return items.map(item => !(item as boolean));
    }
    
    return items;
}

const stringArray = ["hello", "world", "typescript"];
const numberArray = [1, 2, 3, 4, 5];
const booleanArray = [true, false, true];

console.log(`getFirstItem(stringArray): ${getFirstItem(stringArray)}`);
console.log(`getFirstItem(numberArray): ${getFirstItem(numberArray)}`);
console.log(`getFirstItem(booleanArray): ${getFirstItem(booleanArray)}`);

console.log(`processArray(stringArray): [${processArray(stringArray).join(', ')}]`);
console.log(`processArray(numberArray): [${processArray(numberArray).join(', ')}]`);
console.log(`processArray(booleanArray): [${processArray(booleanArray).join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. OVERLOADING WITH OBJECTS
console.log("5. OVERLOADING WITH OBJECTS:");

// Interface definitions
interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

// Function overloads for different object types
function findById(items: User[], id: number): User | undefined;
function findById(items: Product[], id: number): Product | undefined;
function findById(items: any[], id: number): any {
    return items.find(item => item.id === id);
}

function updateItem(items: User[], id: number, updates: Partial<User>): User[];
function updateItem(items: Product[], id: number, updates: Partial<Product>): Product[];
function updateItem(items: any[], id: number, updates: any): any[] {
    return items.map(item => 
        item.id === id ? { ...item, ...updates } : item
    );
}

const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
];

const products: Product[] = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 }
];

console.log(`findById(users, 2):`, findById(users, 2));
console.log(`findById(products, 1):`, findById(products, 1));

const updatedUsers = updateItem(users, 2, { name: "Bobby" });
const updatedProducts = updateItem(products, 1, { price: 899 });

console.log(`Updated user:`, updatedUsers[1]);
console.log(`Updated product:`, updatedProducts[0]);

console.log("\n" + "=".repeat(60) + "\n");

// 6. OVERLOADING WITH GENERICS
console.log("6. OVERLOADING WITH GENERICS:");

// Generic function overloads
function createContainer<T>(value: T): { value: T };
function createContainer<T>(value: T, label: string): { value: T; label: string };
function createContainer<T>(value: T, label?: string): { value: T; label?: string } {
    const container: any = { value };
    if (label !== undefined) {
        container.label = label;
    }
    return container;
}

function processGeneric<T>(items: T[]): T[];
function processGeneric<T>(items: T[], processor: (item: T) => T): T[];
function processGeneric<T>(items: T[], processor?: (item: T) => T): T[] {
    if (processor) {
        return items.map(processor);
    }
    return items;
}

console.log(`createContainer(42):`, createContainer(42));
console.log(`createContainer("Hello", "Greeting"):`, createContainer("Hello", "Greeting"));

const numbers = [1, 2, 3, 4, 5];
const doubled = processGeneric(numbers, (x: number) => x * 2);
const strings = ["hello", "world"];
const uppercased = processGeneric(strings, (s: string) => s.toUpperCase());

console.log(`processGeneric(numbers, double): [${doubled.join(', ')}]`);
console.log(`processGeneric(strings, uppercase): [${uppercased.join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 7. OVERLOADING WITH UNION TYPES
console.log("7. OVERLOADING WITH UNION TYPES:");

// Function overloads with union types
function formatValue(value: string | number): string;
function formatValue(value: boolean): string;
function formatValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `"${value}"`;
    } else if (typeof value === "number") {
        return `#${value}`;
    } else {
        return value ? "YES" : "NO";
    }
}

function combineValues(a: string, b: string): string;
function combineValues(a: number, b: number): number;
function combineValues(a: boolean, b: boolean): boolean;
function combineValues(a: string | number | boolean, b: string | number | boolean): string | number | boolean {
    if (typeof a === "string" && typeof b === "string") {
        return a + " " + b;
    } else if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else if (typeof a === "boolean" && typeof b === "boolean") {
        return a && b;
    }
    return String(a) + String(b);
}

console.log(`formatValue("hello"): ${formatValue("hello")}`);
console.log(`formatValue(42): ${formatValue(42)}`);
console.log(`formatValue(true): ${formatValue(true)}`);

console.log(`combineValues("Hello", "World"): ${combineValues("Hello", "World")}`);
console.log(`combineValues(10, 20): ${combineValues(10, 20)}`);
console.log(`combineValues(true, false): ${combineValues(true, false)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 8. COMPLEX OVERLOADING EXAMPLE
console.log("8. COMPLEX OVERLOADING EXAMPLE:");

// Complex function with multiple overloads
function calculate(operation: "add", a: number, b: number): number;
function calculate(operation: "multiply", a: number, b: number): number;
function calculate(operation: "concat", a: string, b: string): string;
function calculate(operation: "array", a: any[], b: any[]): any[];
function calculate(operation: string, a: any, b: any): any {
    switch (operation) {
        case "add":
            return (a as number) + (b as number);
        case "multiply":
            return (a as number) * (b as number);
        case "concat":
            return (a as string) + (b as string);
        case "array":
            return [...(a as any[]), ...(b as any[])];
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}

console.log(`calculate("add", 5, 3): ${calculate("add", 5, 3)}`);
console.log(`calculate("multiply", 4, 6): ${calculate("multiply", 4, 6)}`);
console.log(`calculate("concat", "Hello", "World"): ${calculate("concat", "Hello", "World")}`);
console.log(`calculate("array", [1, 2], [3, 4]): [${calculate("array", [1, 2], [3, 4]).join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 9. INTERACTIVE EXAMPLE
console.log("9. INTERACTIVE EXAMPLE:");

// Function overloads for user input processing
function processUserInput(input: string): string;
function processUserInput(input: number): number;
function processUserInput(input: string | number): string | number {
    if (typeof input === "string") {
        return input.trim().toUpperCase();
    } else {
        return Math.abs(input);
    }
}

function validateInput(input: string): boolean;
function validateInput(input: number): boolean;
function validateInput(input: string | number): boolean {
    if (typeof input === "string") {
        return input.length > 0 && input.trim().length > 0;
    } else {
        return !isNaN(input) && isFinite(input);
    }
}

// Get user input
const userStringInput = prompt("Enter a string: ");
const userNumberInput = prompt("Enter a number: ");

console.log("\nProcessing inputs...");

if (validateInput(userStringInput)) {
    const processedString = processUserInput(userStringInput);
    console.log(`Processed string: ${processedString}`);
} else {
    console.log("Invalid string input");
}

const numberValue = parseFloat(userNumberInput);
if (validateInput(numberValue)) {
    const processedNumber = processUserInput(numberValue);
    console.log(`Processed number: ${processedNumber}`);
} else {
    console.log("Invalid number input");
}

console.log("\n" + "=".repeat(60) + "\n");
console.log("FUNCTION OVERLOADING SUMMARY:");
console.log("=".repeat(35));
console.log("• Define multiple function signatures");
console.log("• Implementation signature handles all cases");
console.log("• TypeScript chooses the best matching overload");
console.log("• Overloads provide better type safety and IntelliSense");
console.log("• Implementation signature is not visible to callers");
console.log("• Use union types in implementation signature");
console.log("• Overloads must be compatible with implementation");
console.log("• More specific overloads should come first");
