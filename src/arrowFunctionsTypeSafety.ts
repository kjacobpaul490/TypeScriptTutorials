import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Arrow Functions & Type Safety ===\n");

// 1. BASIC ARROW FUNCTIONS WITH TYPE SAFETY
console.log("1. BASIC ARROW FUNCTIONS WITH TYPE SAFETY:");
console.log("=".repeat(50));

// Basic arrow function with explicit types
const add = (a: number, b: number): number => a + b;

// Arrow function with implicit return type
const multiply = (a: number, b: number) => a * b;

// Arrow function with block body
const divide = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
};

// Arrow function with string operations
const greet = (name: string): string => `Hello, ${name}!`;

// Arrow function with boolean return
const isEven = (num: number): boolean => num % 2 === 0;

console.log(`add(5, 3): ${add(5, 3)}`);
console.log(`multiply(4, 6): ${multiply(4, 6)}`);
console.log(`divide(10, 2): ${divide(10, 2)}`);
console.log(`greet("Alice"): ${greet("Alice")}`);
console.log(`isEven(8): ${isEven(8)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 2. ARROW FUNCTIONS WITH ARRAYS
console.log("2. ARROW FUNCTIONS WITH ARRAYS:");

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map with arrow function
const doubled = numbers.map((num: number) => num * 2);

// Filter with arrow function
const evens = numbers.filter((num: number) => num % 2 === 0);

// Reduce with arrow function
const sum = numbers.reduce((acc: number, curr: number) => acc + curr, 0);

// Find with arrow function
const firstEven = numbers.find((num: number) => num % 2 === 0);

// Some with arrow function
const hasEven = numbers.some((num: number) => num % 2 === 0);

// Every with arrow function
const allPositive = numbers.every((num: number) => num > 0);

console.log(`Original numbers: [${numbers.join(', ')}]`);
console.log(`Doubled: [${doubled.join(', ')}]`);
console.log(`Evens: [${evens.join(', ')}]`);
console.log(`Sum: ${sum}`);
console.log(`First even: ${firstEven}`);
console.log(`Has even: ${hasEven}`);
console.log(`All positive: ${allPositive}`);

console.log("\n" + "=".repeat(60) + "\n");

// 3. ARROW FUNCTIONS WITH OBJECTS
console.log("3. ARROW FUNCTIONS WITH OBJECTS:");

// Interface for type safety
interface Person {
    id: number;
    name: string;
    age: number;
    email: string;
}

const people: Person[] = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 35, email: "charlie@example.com" },
    { id: 4, name: "Diana", age: 28, email: "diana@example.com" }
];

// Arrow functions for object operations
const getNames = (people: Person[]): string[] => 
    people.map((person: Person) => person.name);

const getAdults = (people: Person[]): Person[] => 
    people.filter((person: Person) => person.age >= 18);

const getAverageAge = (people: Person[]): number => {
    const totalAge = people.reduce((sum: number, person: Person) => sum + person.age, 0);
    return totalAge / people.length;
};

const findPersonById = (people: Person[], id: number): Person | undefined => 
    people.find((person: Person) => person.id === id);

const sortByAge = (people: Person[]): Person[] => 
    [...people].sort((a: Person, b: Person) => a.age - b.age);

console.log(`Names: [${getNames(people).join(', ')}]`);
console.log(`Adults: ${getAdults(people).length} people`);
console.log(`Average age: ${getAverageAge(people).toFixed(1)}`);
console.log(`Person with ID 2:`, findPersonById(people, 2));
console.log(`Sorted by age:`, sortByAge(people).map(p => `${p.name}(${p.age})`).join(', '));

console.log("\n" + "=".repeat(60) + "\n");

// 4. ARROW FUNCTIONS WITH GENERICS
console.log("4. ARROW FUNCTIONS WITH GENERICS:");

// Generic arrow functions
const identity = <T>(value: T): T => value;

const createArray = <T>(value: T, count: number): T[] => 
    Array(count).fill(value);

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => 
    obj[key];

const filterByProperty = <T>(items: T[], predicate: (item: T) => boolean): T[] => 
    items.filter(predicate);

const mapProperty = <T, U>(items: T[], mapper: (item: T) => U): U[] => 
    items.map(mapper);

// Usage examples
console.log(`identity<string>("Hello"): ${identity<string>("Hello")}`);
console.log(`identity<number>(42): ${identity<number>(42)}`);

console.log(`createArray("A", 3): [${createArray("A", 3).join(', ')}]`);
console.log(`createArray(7, 4): [${createArray(7, 4).join(', ')}]`);

const person = { name: "John", age: 30, city: "New York" };
console.log(`getProperty(person, "name"): ${getProperty(person, "name")}`);
console.log(`getProperty(person, "age"): ${getProperty(person, "age")}`);

const filteredPeople = filterByProperty(people, (p: Person) => p.age > 30);
console.log(`People over 30: [${filteredPeople.map(p => p.name).join(', ')}]`);

const ages = mapProperty(people, (p: Person) => p.age);
console.log(`Ages: [${ages.join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. ARROW FUNCTIONS AS CALLBACKS
console.log("5. ARROW FUNCTIONS AS CALLBACKS:");

// Higher-order functions with arrow functions
const processWithDelay = <T>(value: T, delay: number, callback: (result: T) => void): void => {
    setTimeout(() => callback(value), delay);
};

const retryOperation = <T>(
    operation: () => T, 
    maxRetries: number, 
    onSuccess: (result: T) => void,
    onFailure: (error: Error) => void
): void => {
    let attempts = 0;
    
    const attempt = (): void => {
        attempts++;
        try {
            const result = operation();
            onSuccess(result);
        } catch (error) {
            if (attempts < maxRetries) {
                setTimeout(attempt, 1000);
            } else {
                onFailure(error as Error);
            }
        }
    };
    
    attempt();
};

// Event handler simulation
const createEventHandler = <T>(handler: (event: T) => void) => {
    return (event: T) => {
        console.log("Event received:", event);
        handler(event);
    };
};

// Usage examples
console.log("Processing with delay...");
processWithDelay("Hello World", 100, (result: string) => {
    console.log(`Delayed result: ${result}`);
});

console.log("Retry operation...");
retryOperation(
    () => Math.random() > 0.5 ? "Success!" : (() => { throw new Error("Random failure"); })(),
    3,
    (result: string) => console.log(`Operation succeeded: ${result}`),
    (error: Error) => console.log(`Operation failed after retries: ${error.message}`)
);

const clickHandler = createEventHandler((event: { x: number; y: number }) => {
    console.log(`Click at coordinates: (${event.x}, ${event.y})`);
});

// Simulate click event
clickHandler({ x: 100, y: 200 });

console.log("\n" + "=".repeat(60) + "\n");

// 6. ARROW FUNCTIONS WITH OPTIONAL AND DEFAULT PARAMETERS
console.log("6. ARROW FUNCTIONS WITH OPTIONAL AND DEFAULT PARAMETERS:");

// Arrow functions with optional parameters
const createUser = (name: string, email?: string, age?: number) => ({
    name,
    email: email || "no-email@example.com",
    age: age || 0
});

// Arrow functions with default parameters
const formatMessage = (message: string, prefix: string = "[INFO]", suffix: string = "!") => 
    `${prefix} ${message}${suffix}`;

// Arrow functions with rest parameters
const sumAll = (...numbers: number[]): number => 
    numbers.reduce((total, num) => total + num, 0);

// Arrow functions with mixed parameter types
const processData = (
    data: string, 
    options: { uppercase?: boolean; reverse?: boolean } = {}
): string => {
    let result = data;
    
    if (options.uppercase) {
        result = result.toUpperCase();
    }
    
    if (options.reverse) {
        result = result.split('').reverse().join('');
    }
    
    return result;
};

console.log(`createUser("Alice"):`, createUser("Alice"));
console.log(`createUser("Bob", "bob@example.com"):`, createUser("Bob", "bob@example.com"));
console.log(`createUser("Charlie", "charlie@example.com", 30):`, createUser("Charlie", "charlie@example.com", 30));

console.log(`formatMessage("Hello"): ${formatMessage("Hello")}`);
console.log(`formatMessage("Error", "[ERROR]", "!!!"): ${formatMessage("Error", "[ERROR]", "!!!")}`);

console.log(`sumAll(1, 2, 3, 4, 5): ${sumAll(1, 2, 3, 4, 5)}`);
console.log(`sumAll(10, 20): ${sumAll(10, 20)}`);

console.log(`processData("hello"): ${processData("hello")}`);
console.log(`processData("hello", { uppercase: true }): ${processData("hello", { uppercase: true })}`);
console.log(`processData("hello", { reverse: true }): ${processData("hello", { reverse: true })}`);
console.log(`processData("hello", { uppercase: true, reverse: true }): ${processData("hello", { uppercase: true, reverse: true })}`);

console.log("\n" + "=".repeat(60) + "\n");

// 7. ARROW FUNCTIONS WITH UNION TYPES
console.log("7. ARROW FUNCTIONS WITH UNION TYPES:");

// Arrow functions with union types
const processValue = (value: string | number | boolean): string => {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else if (typeof value === "number") {
        return value.toString();
    } else {
        return value ? "TRUE" : "FALSE";
    }
};

const validateInput = (input: string | number): boolean => {
    if (typeof input === "string") {
        return input.length > 0 && input.trim().length > 0;
    } else {
        return !isNaN(input) && isFinite(input);
    }
};

const formatValue = (value: string | number, format: "uppercase" | "lowercase" | "number"): string => {
    if (typeof value === "string") {
        switch (format) {
            case "uppercase":
                return value.toUpperCase();
            case "lowercase":
                return value.toLowerCase();
            default:
                return value;
        }
    } else {
        switch (format) {
            case "number":
                return value.toFixed(2);
            default:
                return value.toString();
        }
    }
};

console.log(`processValue("hello"): ${processValue("hello")}`);
console.log(`processValue(42): ${processValue(42)}`);
console.log(`processValue(true): ${processValue(true)}`);

console.log(`validateInput("hello"): ${validateInput("hello")}`);
console.log(`validateInput(""): ${validateInput("")}`);
console.log(`validateInput(42): ${validateInput(42)}`);
console.log(`validateInput(NaN): ${validateInput(NaN)}`);

console.log(`formatValue("Hello", "uppercase"): ${formatValue("Hello", "uppercase")}`);
console.log(`formatValue("Hello", "lowercase"): ${formatValue("Hello", "lowercase")}`);
console.log(`formatValue(3.14159, "number"): ${formatValue(3.14159, "number")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 8. INTERACTIVE EXAMPLE
console.log("8. INTERACTIVE EXAMPLE:");

// Arrow functions for user input processing
const validateEmail = (email: string): boolean => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateAge = (age: number): boolean => 
    age >= 0 && age <= 150 && Number.isInteger(age);

const createUserProfile = (name: string, email: string, age: number) => ({
    name: name.trim(),
    email: email.toLowerCase(),
    age,
    isValid: validateEmail(email) && validateAge(age) && name.trim().length > 0
});

const formatUserProfile = (user: ReturnType<typeof createUserProfile>): string => {
    if (user.isValid) {
        return `✅ Valid User: ${user.name} (${user.email}, ${user.age} years old)`;
    } else {
        return `❌ Invalid User: ${user.name}`;
    }
};

// Get user input
const userName = prompt("Enter your name: ");
const userEmail = prompt("Enter your email: ");
const userAgeInput = prompt("Enter your age: ");

const userAge = parseInt(userAgeInput);

console.log("\nProcessing user profile...");
const userProfile = createUserProfile(userName, userEmail, userAge);
const formattedProfile = formatUserProfile(userProfile);

console.log(formattedProfile);

// Additional validation details
if (!userProfile.isValid) {
    console.log("\nValidation details:");
    if (userName.trim().length === 0) {
        console.log("❌ Name cannot be empty");
    }
    if (!validateEmail(userEmail)) {
        console.log("❌ Invalid email format");
    }
    if (!validateAge(userAge)) {
        console.log("❌ Invalid age (must be 0-150 and integer)");
    }
}

console.log("\n" + "=".repeat(60) + "\n");
console.log("ARROW FUNCTIONS & TYPE SAFETY SUMMARY:");
console.log("=".repeat(45));
console.log("ARROW FUNCTIONS:");
console.log("• Syntax: (param: type) => returnType");
console.log("• Implicit return for single expressions");
console.log("• Block body for multiple statements");
console.log("• Lexical 'this' binding");
console.log("• Cannot be used as constructors");
console.log("");
console.log("TYPE SAFETY:");
console.log("• Explicit parameter and return types");
console.log("• Generic type parameters");
console.log("• Union types for flexibility");
console.log("• Type guards for runtime safety");
console.log("• Interface definitions for objects");
console.log("• Compile-time error checking");
console.log("");
console.log("BEST PRACTICES:");
console.log("• Use explicit types for clarity");
console.log("• Leverage type inference when obvious");
console.log("• Use generics for reusable functions");
console.log("• Implement proper error handling");
console.log("• Use type guards for union types");
