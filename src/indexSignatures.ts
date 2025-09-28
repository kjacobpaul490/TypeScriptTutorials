/**
 * TypeScript Index Signatures Examples
 * 
 * Index signatures allow you to define the types of properties that can be
 * accessed using bracket notation with string or number keys.
 */

// ==========================================
// 1. Basic String Index Signature
// ==========================================

interface StringDictionary {
    [key: string]: string;
}

const colors: StringDictionary = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF"
};

// Can add new properties dynamically
colors.yellow = "#FFFF00";
colors["purple"] = "#800080";

console.log("=== Basic String Index Signature ===");
console.log(`Red color: ${colors.red}`);
console.log(`Purple color: ${colors["purple"]}`);

// ==========================================
// 2. Number Index Signature
// ==========================================

interface NumberArray {
    [index: number]: string;
}

const fruits: NumberArray = {
    0: "apple",
    1: "banana",
    2: "cherry"
};

// Can add new elements
fruits[3] = "date";
fruits[4] = "elderberry";

console.log("\n=== Number Index Signature ===");
console.log(`Fruit at index 0: ${fruits[0]}`);
console.log(`Fruit at index 3: ${fruits[3]}`);

// ==========================================
// 3. Mixed Index Signatures
// ==========================================

interface MixedDictionary {
    [key: string]: string | number;
    [key: number]: string | number;
}

const mixedData: MixedDictionary = {
    name: "John",
    age: 30,
    0: "first",
    1: "second"
};

console.log("\n=== Mixed Index Signatures ===");
console.log(`Name: ${mixedData.name}`);
console.log(`Age: ${mixedData.age}`);
console.log(`Index 0: ${mixedData[0]}`);

// ==========================================
// 4. Index Signature with Specific Properties
// ==========================================

interface UserConfig {
    name: string;
    email: string;
    [key: string]: any; // Allow additional properties
}

const userConfig: UserConfig = {
    name: "Alice",
    email: "alice@example.com",
    theme: "dark",
    language: "en",
    notifications: true
};

console.log("\n=== Index Signature with Specific Properties ===");
console.log(`User: ${userConfig.name}`);
console.log(`Theme: ${userConfig.theme}`);
console.log(`Language: ${userConfig.language}`);

// ==========================================
// 5. Readonly Index Signature
// ==========================================

interface ReadonlyConfig {
    readonly [key: string]: string;
}

const readonlyConfig: ReadonlyConfig = {
    apiUrl: "https://api.example.com",
    version: "1.0.0"
};

// readonlyConfig.apiUrl = "https://new-api.com"; // Error: Cannot assign to 'apiUrl' because it is a read-only property

console.log("\n=== Readonly Index Signature ===");
console.log(`API URL: ${readonlyConfig.apiUrl}`);
console.log(`Version: ${readonlyConfig.version}`);

// ==========================================
// 6. Index Signature with Union Types
// ==========================================

interface FlexibleConfig {
    [key: string]: string | number | boolean | string[];
}

const flexibleConfig: FlexibleConfig = {
    name: "My App",
    version: 2.1,
    enabled: true,
    features: ["auth", "dashboard", "reports"],
    timeout: 5000
};

console.log("\n=== Index Signature with Union Types ===");
console.log(`App: ${flexibleConfig.name} v${flexibleConfig.version}`);
console.log(`Enabled: ${flexibleConfig.enabled}`);
console.log(`Features: ${(flexibleConfig.features as string[]).join(", ")}`);

// ==========================================
// 7. Index Signature with Function Types
// ==========================================

interface EventHandlers {
    [eventName: string]: (...args: any[]) => void;
}

const eventHandlers: EventHandlers = {
    click: (x: number, y: number) => console.log(`Clicked at (${x}, ${y})`),
    hover: (element: string) => console.log(`Hovering over ${element}`),
    keypress: (key: string) => console.log(`Key pressed: ${key}`)
};

console.log("\n=== Index Signature with Function Types ===");
eventHandlers.click(100, 200);
eventHandlers.hover("button");
eventHandlers.keypress("Enter");

// ==========================================
// 8. Index Signature with Generic Types
// ==========================================

interface GenericDictionary<T> {
    [key: string]: T;
}

const stringDict: GenericDictionary<string> = {
    first: "hello",
    second: "world"
};

const numberDict: GenericDictionary<number> = {
    x: 10,
    y: 20,
    z: 30
};

const objectDict: GenericDictionary<{ id: number; name: string }> = {
    user1: { id: 1, name: "Alice" },
    user2: { id: 2, name: "Bob" }
};

console.log("\n=== Index Signature with Generic Types ===");
console.log(`String dict: ${stringDict.first} ${stringDict.second}`);
console.log(`Number dict: x=${numberDict.x}, y=${numberDict.y}, z=${numberDict.z}`);
console.log(`Object dict: ${objectDict.user1.name} (ID: ${objectDict.user1.id})`);

// ==========================================
// 9. Index Signature with Optional Properties
// ==========================================

interface OptionalConfig {
    required: string;
    [key: string]: string | undefined;
}

const optionalConfig: OptionalConfig = {
    required: "This is required",
    optional1: "This is optional",
    optional2: undefined
};

console.log("\n=== Index Signature with Optional Properties ===");
console.log(`Required: ${optionalConfig.required}`);
console.log(`Optional 1: ${optionalConfig.optional1}`);
console.log(`Optional 2: ${optionalConfig.optional2}`);

// ==========================================
// 10. Index Signature with Template Literal Types
// ==========================================

interface ApiEndpoints {
    [key: `api/${string}`]: {
        method: "GET" | "POST" | "PUT" | "DELETE";
        handler: () => any;
    };
}

const apiEndpoints: ApiEndpoints = {
    "api/users": {
        method: "GET",
        handler: () => ({ users: [] })
    },
    "api/posts": {
        method: "POST",
        handler: () => ({ success: true })
    }
};

console.log("\n=== Index Signature with Template Literal Types ===");
console.log(`Users endpoint: ${apiEndpoints["api/users"].method}`);
console.log(`Posts endpoint: ${apiEndpoints["api/posts"].method}`);

// ==========================================
// 11. Index Signature with Symbol Keys
// ==========================================

const SYMBOL_KEY = Symbol("key");

interface SymbolDictionary {
    [key: symbol]: string;
    [key: string]: string;
}

const symbolDict: SymbolDictionary = {
    regular: "regular property",
    [SYMBOL_KEY]: "symbol property"
};

console.log("\n=== Index Signature with Symbol Keys ===");
console.log(`Regular: ${symbolDict.regular}`);
console.log(`Symbol: ${symbolDict[SYMBOL_KEY]}`);

// ==========================================
// 12. Index Signature with Mapped Types
// ==========================================

type StringKeys<T> = {
    [K in keyof T as string]: T[K];
};

interface OriginalInterface {
    id: number;
    name: string;
    age: number;
}

type StringKeyedInterface = StringKeys<OriginalInterface>;

const stringKeyed: StringKeyedInterface = {
    id: 1,
    name: "John",
    age: 30
};

console.log("\n=== Index Signature with Mapped Types ===");
console.log(`ID: ${stringKeyed.id}`);
console.log(`Name: ${stringKeyed.name}`);

// ==========================================
// 13. Index Signature with Conditional Types
// ==========================================

type ConditionalIndex<T> = {
    [K in keyof T]: T[K] extends string ? T[K] : never;
};

interface MixedInterface {
    name: string;
    age: number;
    email: string;
    isActive: boolean;
}

type StringOnlyInterface = ConditionalIndex<MixedInterface>;

const stringOnly: StringOnlyInterface = {
    name: "Alice",
    email: "alice@example.com"
    // age and isActive are excluded because they're not strings
};

console.log("\n=== Index Signature with Conditional Types ===");
console.log(`Name: ${stringOnly.name}`);
console.log(`Email: ${stringOnly.email}`);

// ==========================================
// 14. Index Signature with Utility Functions
// ==========================================

function createDictionary<T>(initialData: Record<string, T>): Record<string, T> {
    return { ...initialData };
}

function addToDictionary<T>(
    dict: Record<string, T>,
    key: string,
    value: T
): Record<string, T> {
    return { ...dict, [key]: value };
}

function getFromDictionary<T>(
    dict: Record<string, T>,
    key: string
): T | undefined {
    return dict[key];
}

// Example usage
console.log("\n=== Index Signature with Utility Functions ===");
const initialDict = createDictionary({ a: 1, b: 2, c: 3 });
console.log(`Initial: ${JSON.stringify(initialDict)}`);

const updatedDict = addToDictionary(initialDict, "d", 4);
console.log(`Updated: ${JSON.stringify(updatedDict)}`);

const value = getFromDictionary(updatedDict, "b");
console.log(`Value at 'b': ${value}`);

// ==========================================
// 15. Index Signature with Class Implementation
// ==========================================

class ConfigManager {
    private config: { [key: string]: any } = {};

    set(key: string, value: any): void {
        this.config[key] = value;
    }

    get(key: string): any {
        return this.config[key];
    }

    getAll(): { [key: string]: any } {
        return { ...this.config };
    }

    has(key: string): boolean {
        return key in this.config;
    }

    delete(key: string): boolean {
        if (this.has(key)) {
            delete this.config[key];
            return true;
        }
        return false;
    }
}

// Example usage
console.log("\n=== Index Signature with Class Implementation ===");
const configManager = new ConfigManager();
configManager.set("database", "postgresql");
configManager.set("port", 5432);
configManager.set("debug", true);

console.log(`Database: ${configManager.get("database")}`);
console.log(`Port: ${configManager.get("port")}`);
console.log(`Debug: ${configManager.get("debug")}`);
console.log(`Has 'database': ${configManager.has("database")}`);
console.log(`All config: ${JSON.stringify(configManager.getAll())}`);

export {
    createDictionary,
    addToDictionary,
    getFromDictionary,
    ConfigManager
};
