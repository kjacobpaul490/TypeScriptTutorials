/**
 * TypeScript Type Guards Examples
 * 
 * Type Guards are expressions that perform runtime checks to narrow down the type
 * of a variable within a specific scope. They help TypeScript understand the type
 * of a value at runtime.
 */

// ==========================================
// 1. typeof Type Guards
// ==========================================

function processValue(value: string | number | boolean): string | number | boolean {
    // Using typeof to narrow down the type
    if (typeof value === 'string') {
        // TypeScript knows value is string here
        console.log(`String length: ${value.length}`);
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        // TypeScript knows value is number here
        console.log(`Number squared: ${value * value}`);
        return value * 2;
    } else if (typeof value === 'boolean') {
        // TypeScript knows value is boolean here
        console.log(`Boolean value: ${value}`);
        return !value;
    }
    // This should never happen, but TypeScript requires it
    return value;
}

// Example usage
console.log("=== typeof Type Guards ===");
console.log(processValue("hello"));     // "HELLO"
console.log(processValue(5));           // 10
console.log(processValue(true));        // false

// ==========================================
// 2. instanceof Type Guards
// ==========================================

class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    makeSound(): string {
        return "Some sound";
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    override makeSound(): string {
        return "Woof!";
    }
    wagTail(): string {
        return "Wagging tail";
    }
}

class Cat extends Animal {
    color: string;
    constructor(name: string, color: string) {
        super(name);
        this.color = color;
    }
    override makeSound(): string {
        return "Meow!";
    }
    purr(): string {
        return "Purring...";
    }
}

function handleAnimal(animal: Animal) {
    console.log(`Animal: ${animal.name} makes sound: ${animal.makeSound()}`);
    
    // Using instanceof to narrow down the type
    if (animal instanceof Dog) {
        // TypeScript knows animal is Dog here
        console.log(`Dog breed: ${animal.breed}`);
        console.log(animal.wagTail());
    } else if (animal instanceof Cat) {
        // TypeScript knows animal is Cat here
        console.log(`Cat color: ${animal.color}`);
        console.log(animal.purr());
    }
}

// Example usage
console.log("\n=== instanceof Type Guards ===");
const myDog = new Dog("Buddy", "Golden Retriever");
const myCat = new Cat("Whiskers", "Orange");
handleAnimal(myDog);
handleAnimal(myCat);

// ==========================================
// 3. Custom Type Guards
// ==========================================

// Custom type guard function
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function isEmail(value: unknown): value is string {
    return isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Using custom type guards
function processUnknownValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(`String: ${value.toUpperCase()}`);
    } else if (isNumber(value)) {
        // TypeScript knows value is number here
        console.log(`Number: ${value * 2}`);
    } else if (isEmail(value)) {
        // TypeScript knows value is a valid email string here
        console.log(`Email: ${value} (valid email format)`);
    } else {
        console.log("Unknown type");
    }
}

// Example usage
console.log("\n=== Custom Type Guards ===");
processUnknownValue("hello world");
processUnknownValue(42);
processUnknownValue("user@example.com");
processUnknownValue(true);

// ==========================================
// 4. More Complex Custom Type Guards
// ==========================================

interface User {
    id: number;
    name: string;
    email: string;
}

interface Admin {
    id: number;
    name: string;
    email: string;
    permissions: string[];
}

type UserOrAdmin = User | Admin;

// Custom type guard to check if user is admin
function isAdmin(user: UserOrAdmin): user is Admin {
    return 'permissions' in user;
}

// Custom type guard to check if value is User
function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value &&
        'email' in value &&
        typeof (value as any).id === 'number' &&
        typeof (value as any).name === 'string' &&
        typeof (value as any).email === 'string'
    );
}

// Example usage of isUser
function demonstrateIsUser() {
    const userData = { id: 1, name: "John", email: "john@example.com" };
    if (isUser(userData)) {
        console.log(`User: ${userData.name} (${userData.email})`);
    }
}

function handleUser(user: UserOrAdmin) {
    console.log(`User: ${user.name} (${user.email})`);
    
    if (isAdmin(user)) {
        // TypeScript knows user is Admin here
        console.log(`Admin permissions: ${user.permissions.join(', ')}`);
    } else {
        // TypeScript knows user is User here
        console.log("Regular user");
    }
}

// Example usage
console.log("\n=== Complex Custom Type Guards ===");
const regularUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

const adminUser: Admin = {
    id: 2,
    name: "Jane Admin",
    email: "jane@example.com",
    permissions: ["read", "write", "delete"]
};

handleUser(regularUser);
handleUser(adminUser);

// ==========================================
// 5. Type Guards with Union Types
// ==========================================

// type Status = 'loading' | 'success' | 'error'; // Removed unused type

interface LoadingState {
    status: 'loading';
}

interface SuccessState {
    status: 'success';
    data: any;
}

interface ErrorState {
    status: 'error';
    error: string;
}

type AppState = LoadingState | SuccessState | ErrorState;

// Type guard functions for each state
function isLoading(state: AppState): state is LoadingState {
    return state.status === 'loading';
}

function isSuccess(state: AppState): state is SuccessState {
    return state.status === 'success';
}

function isError(state: AppState): state is ErrorState {
    return state.status === 'error';
}

function handleAppState(state: AppState) {
    if (isLoading(state)) {
        console.log("App is loading...");
    } else if (isSuccess(state)) {
        console.log(`Success! Data: ${JSON.stringify(state.data)}`);
    } else if (isError(state)) {
        console.log(`Error: ${state.error}`);
    }
}

// Example usage
console.log("\n=== Type Guards with Union Types ===");
const loadingState: AppState = { status: 'loading' };
const successState: AppState = { status: 'success', data: { message: 'Hello World' } };
const errorState: AppState = { status: 'error', error: 'Something went wrong' };

handleAppState(loadingState);
handleAppState(successState);
handleAppState(errorState);

export { processValue, handleAnimal, processUnknownValue, handleUser, handleAppState, demonstrateIsUser };
