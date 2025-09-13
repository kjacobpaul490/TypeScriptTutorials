import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Union & Intersection Types ===\n");

// 1. UNION TYPES - Using the | operator
console.log("1. UNION TYPES (|):");
console.log("A value can be one of several types\n");

// Basic union types
let id: string | number;
id = "ABC123";
console.log(`id as string: "${id}" (type: ${typeof id})`);
id = 12345;
console.log(`id as number: ${id} (type: ${typeof id})`);

// Union with multiple types
let value: string | number | boolean;
value = "Hello";
console.log(`value as string: "${value}"`);
value = 42;
console.log(`value as number: ${value}`);
value = true;
console.log(`value as boolean: ${value}`);

// Array of union types
let mixedArray: (string | number)[] = ["hello", 42, "world", 100];
console.log(`mixedArray: [${mixedArray.join(', ')}]`);

console.log("\n" + "=".repeat(60) + "\n");

// 2. UNION TYPES WITH FUNCTIONS
console.log("2. UNION TYPES WITH FUNCTIONS:");

// Function that accepts union types
function processValue(input: string | number): string {
    if (typeof input === "string") {
        return `String: ${input.toUpperCase()}`;
    } else {
        return `Number: ${input * 2}`;
    }
}

console.log(`processValue("hello"): ${processValue("hello")}`);
console.log(`processValue(21): ${processValue(21)}`);

// Function that returns union types
function getValue(condition: boolean): string | number {
    return condition ? "Success" : 404;
}

let result1 = getValue(true);
let result2 = getValue(false);
console.log(`getValue(true): ${result1} (type: ${typeof result1})`);
console.log(`getValue(false): ${result2} (type: ${typeof result2})`);

console.log("\n" + "=".repeat(60) + "\n");

// 3. LITERAL UNION TYPES
console.log("3. LITERAL UNION TYPES:");

// String literal union
type Status = "pending" | "approved" | "rejected";
let currentStatus: Status = "pending";
console.log(`Current status: ${currentStatus}`);

// Number literal union
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;
console.log(`Dice roll: ${roll}`);

// Mixed literal union
type Theme = "light" | "dark" | "auto";
let currentTheme: Theme = "dark";
console.log(`Current theme: ${currentTheme}`);

console.log("\n" + "=".repeat(60) + "\n");

// 4. INTERSECTION TYPES - Using the & operator
console.log("4. INTERSECTION TYPES (&):");
console.log("Combines multiple types into one\n");

// Basic intersection types
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: string;
    department: string;
}

// Intersection type combines both interfaces
type EmployeePerson = Person & Employee;

let employee: EmployeePerson = {
    name: "Alice Johnson",
    age: 30,
    employeeId: "EMP001",
    department: "Engineering"
};

console.log("Employee object:", employee);

// Another intersection example
interface Flyable {
    fly(): string;
}

interface Swimmable {
    swim(): string;
}

type Duck = Flyable & Swimmable;

let duck: Duck = {
    fly: () => "Flying high!",
    swim: () => "Swimming in water!"
};

console.log(`Duck can ${duck.fly()} and ${duck.swim()}`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. COMPLEX INTERSECTION TYPES
console.log("5. COMPLEX INTERSECTION TYPES:");

interface HasId {
    id: string;
}

interface HasName {
    name: string;
}

interface HasEmail {
    email: string;
}

interface HasPhone {
    phone: string;
}

// Multiple intersections
type Contact = HasId & HasName & HasEmail;
type FullContact = Contact & HasPhone;

let contact: Contact = {
    id: "C001",
    name: "Bob Smith",
    email: "bob@example.com"
};

let fullContact: FullContact = {
    id: "C002",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-1234"
};

console.log("Contact:", contact);
console.log("Full Contact:", fullContact);

console.log("\n" + "=".repeat(60) + "\n");

// 6. UNION VS INTERSECTION PRACTICAL EXAMPLES
console.log("6. PRACTICAL EXAMPLES:");

// Union: Either admin OR user permissions
type AdminPermissions = {
    canDelete: true;
    canModify: true;
    canView: true;
};

type UserPermissions = {
    canDelete: false;
    canModify: false;
    canView: true;
};

type UserRole = AdminPermissions | UserPermissions;

// Intersection: Must have both user info AND permissions
interface UserInfo {
    id: string;
    name: string;
    email: string;
}

type UserWithPermissions = UserInfo & UserRole;

let adminUser: UserWithPermissions = {
    id: "A001",
    name: "Admin User",
    email: "admin@example.com",
    canDelete: true,
    canModify: true,
    canView: true
};

let regularUser: UserWithPermissions = {
    id: "U001",
    name: "Regular User",
    email: "user@example.com",
    canDelete: false,
    canModify: false,
    canView: true
};

console.log("Admin User:", adminUser);
console.log("Regular User:", regularUser);

console.log("\n" + "=".repeat(60) + "\n");

// 7. TYPE GUARDS WITH UNION TYPES
console.log("7. TYPE GUARDS WITH UNION TYPES:");

interface Circle {
    kind: "circle";
    radius: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
    // Type guard using discriminated union
    if (shape.kind === "circle") {
        return Math.PI * shape.radius * shape.radius;
    } else {
        return shape.width * shape.height;
    }
}

let circle: Shape = { kind: "circle", radius: 5 };
let rectangle: Shape = { kind: "rectangle", width: 4, height: 6 };

console.log(`Circle area: ${calculateArea(circle).toFixed(6)}`);
console.log(`Rectangle area: ${calculateArea(rectangle)}`);

console.log("\n" + "=".repeat(60) + "\n");

// 8. INTERACTIVE EXAMPLE
console.log("8. INTERACTIVE EXAMPLE:");

// Create a user profile with union and intersection types
interface BasicInfo {
    firstName: string;
    lastName: string;
}

interface ContactInfo {
    email: string;
    phone?: string | undefined; // Optional property that can be undefined
}

interface Preferences {
    theme: "light" | "dark" | "auto";
    notifications: boolean;
}

type UserProfile = BasicInfo & ContactInfo & Preferences;

let userProfile: UserProfile = {
    firstName: prompt("Enter your first name: "),
    lastName: prompt("Enter your last name: "),
    email: prompt("Enter your email: "),
    phone: prompt("Enter your phone (optional): ") || undefined,
    theme: prompt("Choose theme (light/dark/auto): ") as "light" | "dark" | "auto",
    notifications: prompt("Enable notifications? (y/n): ").toLowerCase() === "y"
};

console.log("\nYour Profile:");
console.log("=".repeat(30));
console.log(`Name: ${userProfile.firstName} ${userProfile.lastName}`);
console.log(`Email: ${userProfile.email}`);
console.log(`Phone: ${userProfile.phone || "Not provided"}`);
console.log(`Theme: ${userProfile.theme}`);
console.log(`Notifications: ${userProfile.notifications ? "Enabled" : "Disabled"}`);

console.log("\n" + "=".repeat(60) + "\n");
console.log("KEY DIFFERENCES:");
console.log("• UNION (|): Value can be ONE of several types");
console.log("• INTERSECTION (&): Value must be ALL of the combined types");
console.log("• Union: 'string | number' means string OR number");
console.log("• Intersection: 'A & B' means both A AND B properties");
console.log("• Use unions for flexibility");
console.log("• Use intersections for combining requirements");
