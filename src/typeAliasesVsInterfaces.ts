import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Type Aliases vs Interfaces ===\n");

// 1. BASIC SYNTAX DIFFERENCES
console.log("1. BASIC SYNTAX DIFFERENCES:");
console.log("=".repeat(40));

// Type Alias - using 'type' keyword
type UserType = {
    id: number;
    name: string;
    email: string;
};

// Interface - using 'interface' keyword
interface UserInterface {
    id: number;
    name: string;
    email: string;
}

// Both can be used similarly
let user1: UserType = { id: 1, name: "Alice", email: "alice@example.com" };
let user2: UserInterface = { id: 2, name: "Bob", email: "bob@example.com" };

console.log("Type Alias User:", user1);
console.log("Interface User:", user2);

console.log("\n" + "=".repeat(60) + "\n");

// 2. PRIMITIVE TYPES - Type Aliases Only
console.log("2. PRIMITIVE TYPES (Type Aliases Only):");
console.log("Interfaces cannot represent primitive types\n");

// Type aliases can represent primitives
type ID = string | number;
type Status = "active" | "inactive" | "pending";
type Theme = "light" | "dark";

let userId: ID = "user123";
let userStatus: Status = "active";
let currentTheme: Theme = "dark";

console.log(`User ID: ${userId} (type: ${typeof userId})`);
console.log(`Status: ${userStatus}`);
console.log(`Theme: ${currentTheme}`);

// This would cause an error with interfaces:
// interface StringType = string; // ❌ Error!

console.log("\n" + "=".repeat(60) + "\n");

// 3. UNION TYPES - Type Aliases Only
console.log("3. UNION TYPES (Type Aliases Only):");
console.log("Interfaces cannot represent union types\n");

// Type aliases can represent unions
type StringOrNumber = string | number;
type Shape = "circle" | "square" | "triangle";
type Result = { success: true; data: any } | { success: false; error: string };

let value: StringOrNumber = "Hello";
console.log(`StringOrNumber: ${value} (type: ${typeof value})`);
value = 42;
console.log(`StringOrNumber: ${value} (type: ${typeof value})`);

let shape: Shape = "circle";
console.log(`Shape: ${shape}`);

let result: Result = { success: true, data: { id: 1 } };
console.log(`Result:`, result);

console.log("\n" + "=".repeat(60) + "\n");

// 4. INTERFACE EXTENSION - Interfaces Only
console.log("4. INTERFACE EXTENSION (Interfaces Only):");
console.log("Interfaces can be extended, type aliases cannot\n");

// Base interface
interface Animal {
    name: string;
    age: number;
}

// Interface extension
interface Dog extends Animal {
    breed: string;
    bark(): string;
}

// Interface extension with multiple inheritance
interface Cat extends Animal {
    color: string;
    meow(): string;
}

// Type alias cannot be extended like this:
// type DogType extends Animal = { ... } // ❌ Error!

let dog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    bark: () => "Woof! Woof!"
};

let cat: Cat = {
    name: "Whiskers",
    age: 2,
    color: "Orange",
    meow: () => "Meow! Meow!"
};

console.log(`Dog: ${dog.name}, ${dog.age} years old, ${dog.breed} - ${dog.bark()}`);
console.log(`Cat: ${cat.name}, ${cat.age} years old, ${cat.color} - ${cat.meow()}`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. INTERFACE MERGING - Interfaces Only
console.log("5. INTERFACE MERGING (Interfaces Only):");
console.log("Multiple interface declarations with the same name are merged\n");

// First declaration
interface Config {
    apiUrl: string;
    timeout: number;
}

// Second declaration - automatically merged
interface Config {
    retries: number;
    debug: boolean;
}

// Third declaration - also merged
interface Config {
    version: string;
}

// All properties are available
let config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    debug: true,
    version: "1.0.0"
};

console.log("Merged Config:", config);

// Type aliases cannot be merged:
// type ConfigType = { apiUrl: string }; // First declaration
// type ConfigType = { timeout: number }; // ❌ Error! Duplicate identifier

console.log("\n" + "=".repeat(60) + "\n");

// 6. COMPUTED PROPERTIES - Type Aliases Only
console.log("6. COMPUTED PROPERTIES (Type Aliases Only):");
console.log("Type aliases can use computed properties\n");

// Type alias with computed properties
type EventHandlers = {
    [K in 'click' | 'hover' | 'focus']: () => void;
};

let handlers: EventHandlers = {
    click: () => console.log("Clicked!"),
    hover: () => console.log("Hovered!"),
    focus: () => console.log("Focused!")
};

console.log("Event Handlers:", Object.keys(handlers));

// Type alias with mapped types
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type User = {
    id: number;
    name: string;
    email: string;
};

type PartialUser = Partial<User>; // All properties are now optional

let partialUser: PartialUser = {
    name: "John" // Only name is required, id and email are optional
};

console.log("Partial User:", partialUser);

console.log("\n" + "=".repeat(60) + "\n");

// 7. IMPLEMENTATION - Interfaces Only
console.log("7. IMPLEMENTATION (Interfaces Only):");
console.log("Classes can implement interfaces, but not type aliases\n");

// Interface for implementation
interface Drawable {
    draw(): string;
    area(): number;
}

// Class implementing interface
class Circle implements Drawable {
    constructor(private radius: number) {}
    
    draw(): string {
        return `Drawing a circle with radius ${this.radius}`;
    }
    
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle implements Drawable {
    constructor(private width: number, private height: number) {}
    
    draw(): string {
        return `Drawing a rectangle ${this.width}x${this.height}`;
    }
    
    area(): number {
        return this.width * this.height;
    }
}

let circle = new Circle(5);
let rectangle = new Rectangle(4, 6);

console.log(circle.draw());
console.log(`Circle area: ${circle.area().toFixed(2)}`);
console.log(rectangle.draw());
console.log(`Rectangle area: ${rectangle.area()}`);

// Type aliases cannot be implemented:
// type DrawableType = { draw(): string; area(): number; }
// class Circle implements DrawableType { ... } // ❌ Error!

console.log("\n" + "=".repeat(60) + "\n");

// 8. COMPLEX EXAMPLES
console.log("8. COMPLEX EXAMPLES:");

// Type alias for complex union
type ApiResponse<T> = 
    | { success: true; data: T; status: number }
    | { success: false; error: string; status: number };

// Interface for API client
interface ApiClient {
    baseUrl: string;
    get<T>(endpoint: string): Promise<ApiResponse<T>>;
    post<T>(endpoint: string, data: any): Promise<ApiResponse<T>>;
}

// Example usage of ApiClient
class HttpClient implements ApiClient {
    constructor(public baseUrl: string) {}
    
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        // Simulate API call
        console.log(`GET request to: ${this.baseUrl}${endpoint}`);
        return { success: true, data: {} as T, status: 200 };
    }
    
    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        // Simulate API call
        console.log(`POST request to: ${this.baseUrl}${endpoint} with data:`, data);
        return { success: true, data: {} as T, status: 201 };
    }
}

let apiClient = new HttpClient("https://api.example.com");
console.log("API Client created with base URL:", apiClient.baseUrl);

// Type alias for utility types
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

type UserProfile = {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
};

type UserWithRequiredEmail = RequiredFields<UserProfile, 'email'>;

let userWithEmail: UserWithRequiredEmail = {
    name: "Alice",
    email: "alice@example.com" // email is now required
};

console.log("User with required email:", userWithEmail);

console.log("\n" + "=".repeat(60) + "\n");

// 9. INTERACTIVE EXAMPLE
console.log("9. INTERACTIVE EXAMPLE:");

// Using both type aliases and interfaces together
interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

type EntityStatus = "active" | "inactive" | "pending" | "deleted";

interface UserEntity extends BaseEntity {
    name: string;
    email: string;
    status: EntityStatus;
}

type UserRole = "admin" | "user" | "moderator";
type UserPermissions = {
    [K in UserRole]: {
        canRead: boolean;
        canWrite: boolean;
        canDelete: boolean;
    };
};

let userPermissions: UserPermissions = {
    admin: { canRead: true, canWrite: true, canDelete: true },
    user: { canRead: true, canWrite: false, canDelete: false },
    moderator: { canRead: true, canWrite: true, canDelete: false }
};

let currentUser: UserEntity = {
    id: "user123",
    name: prompt("Enter your name: "),
    email: prompt("Enter your email: "),
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
};

let userRole: UserRole = prompt("Enter your role (admin/user/moderator): ") as UserRole;

console.log("\nUser Information:");
console.log("=".repeat(30));
console.log(`Name: ${currentUser.name}`);
console.log(`Email: ${currentUser.email}`);
console.log(`Status: ${currentUser.status}`);
console.log(`Role: ${userRole}`);
console.log(`Permissions:`, userPermissions[userRole]);

console.log("\n" + "=".repeat(60) + "\n");
console.log("SUMMARY - WHEN TO USE WHICH:");
console.log("=".repeat(40));
console.log("USE TYPE ALIASES FOR:");
console.log("• Primitive types (string, number, boolean)");
console.log("• Union types (string | number)");
console.log("• Computed/mapped types");
console.log("• Complex type transformations");
console.log("• When you need to create new types from existing ones");
console.log("");
console.log("USE INTERFACES FOR:");
console.log("• Object shapes and structures");
console.log("• When you need extension (inheritance)");
console.log("• When you need merging (multiple declarations)");
console.log("• When classes need to implement them");
console.log("• Public API contracts");
console.log("");
console.log("GENERAL RULE:");
console.log("• Use interfaces for object shapes");
console.log("• Use type aliases for everything else");
