import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Basic Generics ===\n");

// 1. BASIC GENERIC FUNCTIONS
console.log("1. BASIC GENERIC FUNCTIONS:");
console.log("=".repeat(40));

// Generic function with type parameter T
function identity<T>(arg: T): T {
    return arg;
}

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Generic function with array
function getFirstItem<T>(items: T[]): T | undefined {
    return items.length > 0 ? items[0] : undefined;
}

// Generic function with constraint
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log(`identity<string>("Hello"): ${identity<string>("Hello")}`);
console.log(`identity<number>(42): ${identity<number>(42)}`);
console.log(`identity<boolean>(true): ${identity<boolean>(true)}`);

console.log(`pair<string, number>("Alice", 25): [${pair<string, number>("Alice", 25).join(', ')}]`);
console.log(`pair<boolean, string>(true, "Success"): [${pair<boolean, string>(true, "Success").join(', ')}]`);

console.log(`getFirstItem([1, 2, 3]): ${getFirstItem([1, 2, 3])}`);
console.log(`getFirstItem(["a", "b", "c"]): ${getFirstItem(["a", "b", "c"])}`);
console.log(`getFirstItem([]): ${getFirstItem([])}`);

console.log(`getLength("Hello"): ${getLength("Hello")}`);
console.log(`getLength([1, 2, 3, 4, 5]): ${getLength([1, 2, 3, 4, 5])}`);

console.log("\n" + "=".repeat(60) + "\n");

// 2. GENERIC INTERFACES
console.log("2. GENERIC INTERFACES:");

// Generic interface
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

// Generic interface with multiple type parameters
interface KeyValuePair<K, V> {
    key: K;
    value: V;
    getPair(): [K, V];
}

// Implementation of generic interface
class Box<T> implements Container<T> {
    constructor(public value: T) {}
    
    getValue(): T {
        return this.value;
    }
    
    setValue(value: T): void {
        this.value = value;
    }
}

class Pair<K, V> implements KeyValuePair<K, V> {
    constructor(public key: K, public value: V) {}
    
    getPair(): [K, V] {
        return [this.key, this.value];
    }
}

// Usage examples
const stringBox = new Box<string>("Hello Generics!");
const numberBox = new Box<number>(42);
const booleanBox = new Box<boolean>(true);

console.log(`stringBox.getValue(): ${stringBox.getValue()}`);
console.log(`numberBox.getValue(): ${numberBox.getValue()}`);
console.log(`booleanBox.getValue(): ${booleanBox.getValue()}`);

const userPair = new Pair<string, number>("age", 25);
const configPair = new Pair<string, boolean>("debug", true);

console.log(`userPair.getPair(): [${userPair.getPair().join(', ')}]`);
console.log(`configPair.getPair(): [${configPair.getPair().join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 3. GENERIC CLASSES
console.log("3. GENERIC CLASSES:");

// Generic class with type parameter
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
    
    getAll(): T[] {
        return [...this.items];
    }
}

// Generic class with multiple type parameters
class Dictionary<K, V> {
    private items: Map<K, V> = new Map();
    
    set(key: K, value: V): void {
        this.items.set(key, value);
    }
    
    get(key: K): V | undefined {
        return this.items.get(key);
    }
    
    has(key: K): boolean {
        return this.items.has(key);
    }
    
    delete(key: K): boolean {
        return this.items.delete(key);
    }
    
    keys(): K[] {
        return Array.from(this.items.keys());
    }
    
    values(): V[] {
        return Array.from(this.items.values());
    }
    
    entries(): [K, V][] {
        return Array.from(this.items.entries());
    }
}

// Usage examples
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(`numberStack.getAll(): [${numberStack.getAll().join(', ')}]`);
console.log(`numberStack.pop(): ${numberStack.pop()}`);
console.log(`numberStack.peek(): ${numberStack.peek()}`);

const stringStack = new Stack<string>();
stringStack.push("First");
stringStack.push("Second");
stringStack.push("Third");

console.log(`stringStack.getAll(): [${stringStack.getAll().join(', ')}]`);

const userDict = new Dictionary<string, number>();
userDict.set("Alice", 25);
userDict.set("Bob", 30);
userDict.set("Charlie", 35);

console.log(`userDict.get("Alice"): ${userDict.get("Alice")}`);
console.log(`userDict.keys(): [${userDict.keys().join(', ')}]`);
console.log(`userDict.values(): [${userDict.values().join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 4. GENERIC CONSTRAINTS
console.log("4. GENERIC CONSTRAINTS:");

// Constraint with extends
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(item: T): void {
    console.log(`Length of item: ${item.length}`);
}

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Constraint with multiple types
interface Comparable {
    compareTo(other: Comparable): number;
}

function findMax<T extends Comparable>(items: T[]): T | undefined {
    if (items.length === 0) return undefined;
    
    let max: T = items[0]!; // Non-null assertion since we checked length > 0
    for (let i = 1; i < items.length; i++) {
        const currentItem = items[i];
        if (currentItem && currentItem.compareTo(max) > 0) {
            max = currentItem;
        }
    }
    return max;
}

// Example usage of findMax
class NumberItem implements Comparable {
    constructor(public value: number) {}
    
    compareTo(other: Comparable): number {
        if (other instanceof NumberItem) {
            return this.value - other.value;
        }
        return 0;
    }
}

const numberItems = [
    new NumberItem(10),
    new NumberItem(5),
    new NumberItem(20),
    new NumberItem(15)
];

const maxNumber = findMax(numberItems);
console.log(`Max number item: ${maxNumber?.value || 'No items'}`);

// Usage examples
logLength("Hello World");
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10 });

const person = { name: "Alice", age: 25, city: "New York" };
console.log(`getProperty(person, "name"): ${getProperty(person, "name")}`);
console.log(`getProperty(person, "age"): ${getProperty(person, "age")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. GENERIC UTILITY TYPES
console.log("5. GENERIC UTILITY TYPES:");

// Partial<T> - makes all properties optional
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;

// Required<T> - makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick<T, K> - picks specific properties
type UserName = Pick<User, 'name'>;

// Omit<T, K> - omits specific properties
type UserWithoutId = Omit<User, 'id'>;

// Record<K, V> - creates object type with specific keys and values
type UserRoles = Record<string, string[]>;

// Usage examples
const partialUser: PartialUser = { name: "Alice" };
const requiredUser: RequiredUser = { id: 1, name: "Bob", email: "bob@example.com", age: 30 };
const userName: UserName = { name: "Charlie" };
const userWithoutId: UserWithoutId = { name: "David", email: "david@example.com", age: 25 };

const userRoles: UserRoles = {
    "admin": ["read", "write", "delete"],
    "user": ["read"],
    "moderator": ["read", "write"]
};

console.log("Partial user:", partialUser);
console.log("Required user:", requiredUser);
console.log("User name only:", userName);
console.log("User without ID:", userWithoutId);
console.log("User roles:", userRoles);

console.log("\n" + "=".repeat(60) + "\n");

// 6. GENERIC FUNCTIONS WITH ARRAYS
console.log("6. GENERIC FUNCTIONS WITH ARRAYS:");

// Generic function to filter arrays
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    return arr.filter(predicate);
}

// Generic function to map arrays
function mapArray<T, U>(arr: T[], mapper: (item: T) => U): U[] {
    return arr.map(mapper);
}

// Generic function to find items
function findItem<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
    return arr.find(predicate);
}

// Generic function to reduce arrays
function reduceArray<T, U>(arr: T[], reducer: (acc: U, item: T) => U, initialValue: U): U {
    return arr.reduce(reducer, initialValue);
}

// Usage examples
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = filterArray(numbers, (n) => n % 2 === 0);
const doubledNumbers = mapArray(numbers, (n) => n * 2);
const firstEven = findItem(numbers, (n) => n % 2 === 0);
const sum = reduceArray(numbers, (acc, n) => acc + n, 0);

console.log(`Original numbers: [${numbers.join(', ')}]`);
console.log(`Even numbers: [${evenNumbers.join(', ')}]`);
console.log(`Doubled numbers: [${doubledNumbers.join(', ')}]`);
console.log(`First even number: ${firstEven}`);
console.log(`Sum of all numbers: ${sum}`);

const words = ["apple", "banana", "cherry", "date", "elderberry"];
const longWords = filterArray(words, (word) => word.length > 5);
const wordLengths = mapArray(words, (word) => word.length);
const firstLongWord = findItem(words, (word) => word.length > 5);

console.log(`Original words: [${words.join(', ')}]`);
console.log(`Long words: [${longWords.join(', ')}]`);
console.log(`Word lengths: [${wordLengths.join(', ')}]`);
console.log(`First long word: ${firstLongWord}`);

console.log("\n" + "=".repeat(60) + "\n");

// 7. INTERACTIVE EXAMPLE
console.log("7. INTERACTIVE EXAMPLE:");

// Generic function for user input validation
function validateInput<T>(input: string, validator: (value: string) => T | null): T | null {
    try {
        return validator(input);
    } catch (error) {
        return null;
    }
}

// Validators for different types
const numberValidator = (value: string): number | null => {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
};

const emailValidator = (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? value : null;
};

const booleanValidator = (value: string): boolean | null => {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') return true;
    if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') return false;
    return null;
};

// Get user input
const userInput = prompt("Enter a number: ");
const emailInput = prompt("Enter an email: ");
const booleanInput = prompt("Enter true/false: ");

// Validate inputs
const validNumber = validateInput(userInput, numberValidator);
const validEmail = validateInput(emailInput, emailValidator);
const validBoolean = validateInput(booleanInput, booleanValidator);

console.log("\nValidation Results:");
console.log(`Number input: ${userInput} -> ${validNumber !== null ? validNumber : 'Invalid'}`);
console.log(`Email input: ${emailInput} -> ${validEmail !== null ? validEmail : 'Invalid'}`);
console.log(`Boolean input: ${booleanInput} -> ${validBoolean !== null ? validBoolean : 'Invalid'}`);

console.log("\n" + "=".repeat(60) + "\n");
console.log("GENERICS SUMMARY:");
console.log("=".repeat(20));
console.log("• <T> - Type parameter");
console.log("• <T, U> - Multiple type parameters");
console.log("• T extends Constraint - Type constraints");
console.log("• Generic functions: function name<T>(param: T): T");
console.log("• Generic interfaces: interface Name<T> { }");
console.log("• Generic classes: class Name<T> { }");
console.log("• Utility types: Partial<T>, Required<T>, Pick<T, K>");
console.log("• Generics provide type safety and reusability");
