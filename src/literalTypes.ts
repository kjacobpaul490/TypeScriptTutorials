/**
 * TypeScript Literal Types Examples
 * 
 * Literal types allow you to specify exact values that a variable can have.
 * They are created by combining literal values with union types.
 */

// ==========================================
// 1. String Literal Types
// ==========================================

// Single string literal
let direction: "north" = "north";
// direction = "south"; // Error: Type '"south"' is not assignable to type '"north"'

// Union of string literals
type CardinalDirection = "north" | "south" | "east" | "west";
let compass: CardinalDirection = "north";
compass = "south"; // OK
// compass = "northeast"; // Error: Type '"northeast"' is not assignable to type 'CardinalDirection'

console.log("=== String Literal Types ===");
console.log(`Current direction: ${compass}`);

// ==========================================
// 2. Number Literal Types
// ==========================================

// Single number literal
let diceRoll: 6 = 6;
// diceRoll = 5; // Error: Type '5' is not assignable to type '6'

// Union of number literals
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceValue = 3;
roll = 6; // OK
// roll = 7; // Error: Type '7' is not assignable to type 'DiceValue'

console.log("\n=== Number Literal Types ===");
console.log(`Dice roll: ${roll}`);

// ==========================================
// 3. Boolean Literal Types
// ==========================================

// Single boolean literal
let isTrue: true = true;
// isTrue = false; // Error: Type 'false' is not assignable to type 'true'

// Union of boolean literals
type BooleanValue = true | false;
let flag: BooleanValue = true;
flag = false; // OK

console.log("\n=== Boolean Literal Types ===");
console.log(`Flag value: ${flag}`);

// ==========================================
// 4. Mixed Literal Types
// ==========================================

type Status = "loading" | "success" | "error" | 404 | 500;
let appStatus: Status = "loading";
appStatus = "success"; // OK
appStatus = 404; // OK
// appStatus = "pending"; // Error: Type '"pending"' is not assignable to type 'Status'

console.log("\n=== Mixed Literal Types ===");
console.log(`App status: ${appStatus}`);

// ==========================================
// 5. Literal Types in Function Parameters
// ==========================================

function setTheme(theme: "light" | "dark" | "auto") {
    console.log(`Setting theme to: ${theme}`);
    // Theme-specific logic here
    switch (theme) {
        case "light":
            console.log("Applying light theme styles");
            break;
        case "dark":
            console.log("Applying dark theme styles");
            break;
        case "auto":
            console.log("Applying system theme");
            break;
    }
}

function setFontSize(size: 12 | 14 | 16 | 18 | 20 | 24) {
    console.log(`Setting font size to: ${size}px`);
}

// Example usage
console.log("\n=== Literal Types in Function Parameters ===");
setTheme("dark");
setFontSize(16);

// ==========================================
// 6. Literal Types in Object Properties
// ==========================================

interface ButtonConfig {
    variant: "primary" | "secondary" | "danger";
    size: "small" | "medium" | "large";
    disabled: true | false;
}

function createButton(config: ButtonConfig) {
    console.log(`Creating ${config.size} ${config.variant} button`);
    if (config.disabled) {
        console.log("Button is disabled");
    }
}

// Example usage
console.log("\n=== Literal Types in Object Properties ===");
createButton({
    variant: "primary",
    size: "large",
    disabled: false
});

// ==========================================
// 7. Literal Types with Template Literals
// ==========================================

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = `/api/${string}`;
type FullApiPath = `${HttpMethod} ${ApiEndpoint}`;

function makeApiCall(endpoint: FullApiPath) {
    console.log(`Making API call to: ${endpoint}`);
}

// Example usage
console.log("\n=== Literal Types with Template Literals ===");
makeApiCall("GET /api/users");
makeApiCall("POST /api/orders");
// makeApiCall("PATCH /api/users"); // Error: Type '"PATCH /api/users"' is not assignable to type 'FullApiPath'

// ==========================================
// 8. Literal Types in Union with Other Types
// ==========================================

type StringOrNumber = string | number;
type SpecificValues = "yes" | "no" | 0 | 1;
type MixedType = StringOrNumber | SpecificValues;

function processValue(value: MixedType) {
    if (value === "yes" || value === "no") {
        console.log(`Boolean-like value: ${value}`);
    } else if (value === 0 || value === 1) {
        console.log(`Binary value: ${value}`);
    } else {
        console.log(`Other value: ${value}`);
    }
}

// Example usage
console.log("\n=== Literal Types in Union with Other Types ===");
processValue("yes");
processValue(1);
processValue("hello");
processValue(42);

// ==========================================
// 9. Literal Types with const assertions
// ==========================================

// Without const assertion - type is string
const colors1 = ["red", "green", "blue"];
// colors1[0] = "yellow"; // OK, but type is string[]

// With const assertion - type is readonly tuple with literal types
const colors2 = ["red", "green", "blue"] as const;
// colors2[0] = "yellow"; // Error: Cannot assign to '0' because it is a read-only property

type Color = typeof colors2[number]; // "red" | "green" | "blue"

function setColor(color: Color) {
    console.log(`Setting color to: ${color}`);
}

// Example usage
console.log("\n=== Literal Types with const assertions ===");
setColor("red");
setColor("green");
// setColor("yellow"); // Error: Argument of type '"yellow"' is not assignable to parameter of type 'Color'

// ==========================================
// 10. Literal Types in Enums
// ==========================================

enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}

type UserRoleLiteral = "admin" | "user" | "guest";

function checkPermission(role: UserRoleLiteral) {
    switch (role) {
        case "admin":
            console.log("Full access granted");
            break;
        case "user":
            console.log("Standard access granted");
            break;
        case "guest":
            console.log("Limited access granted");
            break;
    }
}

// Example usage
console.log("\n=== Literal Types in Enums ===");
checkPermission("admin");
checkPermission("user");

// ==========================================
// 11. Literal Types with Discriminated Unions
// ==========================================

type LoadingState = {
    status: "loading";
    progress: number;
};

type SuccessState = {
    status: "success";
    data: any;
};

type ErrorState = {
    status: "error";
    error: string;
};

type AppState = LoadingState | SuccessState | ErrorState;

function handleAppState(state: AppState) {
    switch (state.status) {
        case "loading":
            console.log(`Loading... ${state.progress}%`);
            break;
        case "success":
            console.log(`Success! Data: ${JSON.stringify(state.data)}`);
            break;
        case "error":
            console.log(`Error: ${state.error}`);
            break;
    }
}

// Example usage
console.log("\n=== Literal Types with Discriminated Unions ===");
handleAppState({ status: "loading", progress: 50 });
handleAppState({ status: "success", data: { message: "Hello" } });
handleAppState({ status: "error", error: "Something went wrong" });

// ==========================================
// 12. Literal Types in Generic Constraints
// ==========================================

type EventType = "click" | "hover" | "focus" | "blur";

interface EventHandler<T extends EventType> {
    type: T;
    handler: (event: Event) => void;
}

function createEventHandler<T extends EventType>(
    type: T,
    handler: (event: Event) => void
): EventHandler<T> {
    return { type, handler };
}

// Example usage
console.log("\n=== Literal Types in Generic Constraints ===");
const clickHandler = createEventHandler("click", (event) => {
    console.log("Button clicked!");
});

const hoverHandler = createEventHandler("hover", (event) => {
    console.log("Mouse hovering!");
});

console.log(`Created ${clickHandler.type} handler`);
console.log(`Created ${hoverHandler.type} handler`);

export { 
    setTheme, 
    setFontSize, 
    createButton, 
    makeApiCall, 
    processValue, 
    setColor, 
    checkPermission, 
    handleAppState,
    createEventHandler
};
