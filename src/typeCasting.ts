/**
 * TypeScript Type Casting Examples
 * 
 * Type casting allows you to tell TypeScript that a value should be treated
 * as a specific type, even if TypeScript can't infer it automatically.
 * This is done using the 'as' keyword or angle bracket syntax.
 */

// ==========================================
// 1. Basic Type Casting with 'as' keyword
// ==========================================

// Example 1: Casting from unknown to specific type
function getValue(): unknown {
    return "Hello World";
}

const message = getValue() as string;
console.log("=== Basic Type Casting ===");
console.log(`Message length: ${message.length}`); // TypeScript knows it's a string

// Example 2: Casting from any to specific type
function getData(): any {
    return { name: "John", age: 30 };
}

const userData = getData() as { name: string; age: number };
console.log(`User: ${userData.name}, Age: ${userData.age}`);

// ==========================================
// 2. Type Casting with DOM Elements
// ==========================================

// Example: Casting DOM elements
function handleButtonClick() {
    // TypeScript doesn't know the exact type of getElementById
    const button = document.getElementById('myButton') as HTMLButtonElement;
    
    if (button) {
        // Now TypeScript knows it's an HTMLButtonElement
        button.disabled = true;
        button.textContent = "Clicked!";
        console.log("Button clicked and disabled");
    }
}

// Example: Casting with input elements
function handleInputChange() {
    const input = document.getElementById('myInput') as HTMLInputElement;
    
    if (input) {
        // TypeScript knows it's an HTMLInputElement
        const value = input.value;
        console.log(`Input value: ${value}`);
    }
}

// ==========================================
// 3. Type Casting with Union Types
// ==========================================

type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
    // Type casting to specific type when you know the runtime type
    if (typeof value === 'string') {
        const stringValue = value as string;
        console.log(`String value: ${stringValue.toUpperCase()}`);
    } else {
        const numberValue = value as number;
        console.log(`Number value: ${numberValue * 2}`);
    }
}

// Example usage
console.log("\n=== Type Casting with Union Types ===");
processValue("hello");
processValue(42);

// ==========================================
// 4. Type Casting with Objects and Interfaces
// ==========================================

interface User {
    id: number;
    name: string;
    email: string;
}

interface AdminUser extends User {
    permissions: string[];
}

// Example: Casting from base type to extended type
function createUser(data: any): User {
    return data as User;
}

function promoteToAdmin(user: User): AdminUser {
    // Type casting to add additional properties
    return {
        ...user,
        permissions: ['read', 'write', 'delete']
    } as AdminUser;
}

// Example usage
console.log("\n=== Type Casting with Objects ===");
const userData = { id: 1, name: "John", email: "john@example.com" };
const user = createUser(userData);
const admin = promoteToAdmin(user);
console.log(`Admin permissions: ${admin.permissions.join(', ')}`);

// ==========================================
// 5. Type Casting with Arrays
// ==========================================

function getStringArray(): unknown {
    return ["apple", "banana", "cherry"];
}

function getNumberArray(): unknown {
    return [1, 2, 3, 4, 5];
}

// Casting unknown arrays to typed arrays
const fruits = getStringArray() as string[];
const numbers = getNumberArray() as number[];

console.log("\n=== Type Casting with Arrays ===");
console.log(`Fruits: ${fruits.join(', ')}`);
console.log(`Sum of numbers: ${numbers.reduce((sum, num) => sum + num, 0)}`);

// ==========================================
// 6. Type Casting with Generic Types
// ==========================================

interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

function fetchUserData(): unknown {
    return {
        data: { id: 1, name: "John", email: "john@example.com" },
        status: 200,
        message: "Success"
    };
}

// Casting to generic type
const response = fetchUserData() as ApiResponse<User>;
console.log("\n=== Type Casting with Generic Types ===");
console.log(`User: ${response.data.name}, Status: ${response.status}`);

// ==========================================
// 7. Type Casting with Function Types
// ==========================================

type MathFunction = (x: number, y: number) => number;

function getMathFunction(): unknown {
    return (x: number, y: number) => x + y;
}

// Casting unknown function to specific function type
const addFunction = getMathFunction() as MathFunction;
const result = addFunction(5, 3);
console.log(`\n=== Type Casting with Function Types ===`);
console.log(`5 + 3 = ${result}`);

// ==========================================
// 8. Type Casting with Complex Nested Objects
// ==========================================

interface Address {
    street: string;
    city: string;
    country: string;
}

interface Company {
    name: string;
    address: Address;
    employees: number;
}

interface Employee {
    id: number;
    name: string;
    position: string;
    company: Company;
}

function getEmployeeData(): unknown {
    return {
        id: 1,
        name: "Alice",
        position: "Developer",
        company: {
            name: "Tech Corp",
            address: {
                street: "123 Main St",
                city: "New York",
                country: "USA"
            },
            employees: 100
        }
    };
}

// Casting complex nested object
const employee = getEmployeeData() as Employee;
console.log("\n=== Type Casting with Complex Objects ===");
console.log(`Employee: ${employee.name}`);
console.log(`Company: ${employee.company.name}`);
console.log(`Address: ${employee.company.address.street}, ${employee.company.address.city}`);

// ==========================================
// 9. Type Casting with Error Handling
// ==========================================

function safeJsonParse<T>(jsonString: string): T | null {
    try {
        const parsed = JSON.parse(jsonString);
        return parsed as T;
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

// Example usage
console.log("\n=== Type Casting with Error Handling ===");
const validJson = '{"name": "John", "age": 30}';
const invalidJson = '{"name": "John", "age": }';

const validUser = safeJsonParse<User>(validJson);
const invalidUser = safeJsonParse<User>(invalidJson);

if (validUser) {
    console.log(`Valid user: ${validUser.name}`);
} else {
    console.log("Failed to parse valid JSON");
}

if (invalidUser) {
    console.log(`Invalid user: ${invalidUser.name}`);
} else {
    console.log("Failed to parse invalid JSON");
}

// ==========================================
// 10. Type Casting with Assertion Functions
// ==========================================

function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('Value is not a string');
    }
}

function processUnknownString(value: unknown) {
    // Using assertion function instead of type casting
    assertIsString(value);
    // TypeScript now knows value is string
    console.log(`String length: ${value.length}`);
}

// Example usage
console.log("\n=== Type Casting with Assertion Functions ===");
try {
    processUnknownString("Hello World");
    processUnknownString(123); // This will throw an error
} catch (error) {
    console.log(`Error: ${error}`);
}

export { 
    handleButtonClick, 
    handleInputChange, 
    processValue, 
    createUser, 
    promoteToAdmin,
    safeJsonParse,
    processUnknownString
};
