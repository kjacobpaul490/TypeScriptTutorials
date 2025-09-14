import promptSync from 'prompt-sync';

const prompt = promptSync();

console.log("=== TypeScript Optional & Default Parameters ===\n");

// 1. OPTIONAL PARAMETERS
console.log("1. OPTIONAL PARAMETERS:");
console.log("Use ? to make parameters optional\n");

// Function with optional parameter
function createUser(name: string, email: string, age?: number): string {
    if (age) {
        return `User: ${name}, Email: ${email}, Age: ${age}`;
    }
    return `User: ${name}, Email: ${email}`;
}

// Function with multiple optional parameters
function calculateArea(length: number, width?: number): number {
    if (width) {
        return length * width; // Rectangle
    }
    return length * length; // Square
}

// Function with optional string parameter
function formatMessage(message: string, prefix?: string, suffix?: string): string {
    let result = message;
    if (prefix) {
        result = `${prefix} ${result}`;
    }
    if (suffix) {
        result = `${result} ${suffix}`;
    }
    return result;
}

console.log(`createUser("John", "john@example.com"): ${createUser("John", "john@example.com")}`);
console.log(`createUser("Jane", "jane@example.com", 30): ${createUser("Jane", "jane@example.com", 30)}`);

console.log(`calculateArea(5): ${calculateArea(5)}`);
console.log(`calculateArea(5, 3): ${calculateArea(5, 3)}`);

console.log(`formatMessage("Hello"): ${formatMessage("Hello")}`);
console.log(`formatMessage("Hello", "Hi"): ${formatMessage("Hello", "Hi")}`);
console.log(`formatMessage("Hello", "Hi", "World"): ${formatMessage("Hello", "Hi", "World")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 2. DEFAULT PARAMETERS
console.log("2. DEFAULT PARAMETERS:");
console.log("Provide default values using = operator\n");

// Function with default parameter
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

// Function with multiple default parameters
function createMessage(text: string, prefix: string = "[INFO]", suffix: string = "!"): string {
    return `${prefix} ${text}${suffix}`;
}

// Function with mixed required and default parameters
function buildUrl(domain: string, path: string = "/", protocol: string = "https", port?: number): string {
    let url = `${protocol}://${domain}`;
    if (port) {
        url += `:${port}`;
    }
    url += path;
    return url;
}

// Function with default parameter using previous parameter
function createFullName(firstName: string, lastName: string, middleName: string = ""): string {
    if (middleName) {
        return `${firstName} ${middleName} ${lastName}`;
    }
    return `${firstName} ${lastName}`;
}

console.log(`greet("Alice"): ${greet("Alice")}`);
console.log(`greet("Bob", "Hi"): ${greet("Bob", "Hi")}`);

console.log(`createMessage("Task completed"): ${createMessage("Task completed")}`);
console.log(`createMessage("Error occurred", "[ERROR]", "!!!"): ${createMessage("Error occurred", "[ERROR]", "!!!")}`);

console.log(`buildUrl("example.com"): ${buildUrl("example.com")}`);
console.log(`buildUrl("example.com", "/api"): ${buildUrl("example.com", "/api")}`);
console.log(`buildUrl("example.com", "/api", "http"): ${buildUrl("example.com", "/api", "http")}`);
console.log(`buildUrl("example.com", "/api", "https", 8080): ${buildUrl("example.com", "/api", "https", 8080)}`);

console.log(`createFullName("John", "Doe"): ${createFullName("John", "Doe")}`);
console.log(`createFullName("John", "Doe", "Michael"): ${createFullName("John", "Doe", "Michael")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 3. OPTIONAL VS DEFAULT PARAMETERS
console.log("3. OPTIONAL VS DEFAULT PARAMETERS:");

// Optional parameter (can be undefined)
function processOptional(value: string, options?: { debug: boolean; timeout: number }): string {
    if (options) {
        return `Processing ${value} with debug: ${options.debug}, timeout: ${options.timeout}`;
    }
    return `Processing ${value} with default options`;
}

// Default parameter (always has a value)
function processDefault(value: string, options: { debug: boolean; timeout: number } = { debug: false, timeout: 5000 }): string {
    return `Processing ${value} with debug: ${options.debug}, timeout: ${options.timeout}`;
}

console.log(`processOptional("data"): ${processOptional("data")}`);
console.log(`processOptional("data", { debug: true, timeout: 3000 }): ${processOptional("data", { debug: true, timeout: 3000 })}`);

console.log(`processDefault("data"): ${processDefault("data")}`);
console.log(`processDefault("data", { debug: true, timeout: 3000 }): ${processDefault("data", { debug: true, timeout: 3000 })}`);

console.log("\n" + "=".repeat(60) + "\n");

// 4. COMPLEX EXAMPLES WITH OBJECTS
console.log("4. COMPLEX EXAMPLES WITH OBJECTS:");

// Interface for user configuration
interface UserConfig {
    theme?: "light" | "dark";
    notifications?: boolean;
    language?: string;
}

// Interface for API options
interface ApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    timeout?: number;
}

// Function with optional object parameter
function createUserProfile(name: string, email: string, config?: UserConfig): string {
    let profile = `Name: ${name}, Email: ${email}`;
    
    if (config) {
        if (config.theme) {
            profile += `, Theme: ${config.theme}`;
        }
        if (config.notifications !== undefined) {
            profile += `, Notifications: ${config.notifications}`;
        }
        if (config.language) {
            profile += `, Language: ${config.language}`;
        }
    }
    
    return profile;
}

// Function with default object parameter
function makeApiCall(url: string, options: ApiOptions = { method: "GET", timeout: 5000 }): string {
    return `Making ${options.method} request to ${url} with timeout ${options.timeout}ms`;
}

console.log(`createUserProfile("Alice", "alice@example.com"): ${createUserProfile("Alice", "alice@example.com")}`);
console.log(`createUserProfile("Bob", "bob@example.com", { theme: "dark", notifications: true }): ${createUserProfile("Bob", "bob@example.com", { theme: "dark", notifications: true })}`);

console.log(`makeApiCall("https://api.example.com"): ${makeApiCall("https://api.example.com")}`);
console.log(`makeApiCall("https://api.example.com", { method: "POST", timeout: 10000 }): ${makeApiCall("https://api.example.com", { method: "POST", timeout: 10000 })}`);

console.log("\n" + "=".repeat(60) + "\n");

// 5. REST PARAMETERS WITH OPTIONAL/DEFAULT
console.log("5. REST PARAMETERS WITH OPTIONAL/DEFAULT:");

// Function with required, optional, default, and rest parameters
function processData(
    operation: string,
    data?: any[],
    options: { verbose: boolean; format: string } = { verbose: false, format: "json" },
    ...additionalParams: string[]
): string {
    let result = `Operation: ${operation}`;
    
    if (data) {
        result += `, Data: ${data.length} items`;
    }
    
    result += `, Options: ${JSON.stringify(options)}`;
    
    if (additionalParams.length > 0) {
        result += `, Additional: ${additionalParams.join(", ")}`;
    }
    
    return result;
}

console.log(`processData("create"): ${processData("create")}`);
console.log(`processData("update", [1, 2, 3]): ${processData("update", [1, 2, 3])}`);
console.log(`processData("delete", [1, 2, 3], { verbose: true, format: "xml" }): ${processData("delete", [1, 2, 3], { verbose: true, format: "xml" })}`);
console.log(`processData("read", undefined, { verbose: true, format: "xml" }, "param1", "param2"): ${processData("read", undefined, { verbose: true, format: "xml" }, "param1", "param2")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 6. FUNCTION OVERLOADS WITH OPTIONAL/DEFAULT
console.log("6. FUNCTION OVERLOADS WITH OPTIONAL/DEFAULT:");

// Function overloads
function calculate(a: number, b: number): number;
function calculate(a: number, b: number, operation: string): number;
function calculate(a: number, b: number, operation: string = "add"): number {
    switch (operation.toLowerCase()) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return a / b;
        default:
            return a + b;
    }
}

console.log(`calculate(5, 3): ${calculate(5, 3)}`);
console.log(`calculate(5, 3, "multiply"): ${calculate(5, 3, "multiply")}`);
console.log(`calculate(10, 2, "divide"): ${calculate(10, 2, "divide")}`);

console.log("\n" + "=".repeat(60) + "\n");

// 7. INTERACTIVE EXAMPLE
console.log("7. INTERACTIVE EXAMPLE:");

// Function with optional and default parameters for user creation
function createUserAccount(
    username: string,
    email: string,
    age?: number,
    role: string = "user",
    isActive: boolean = true
): string {
    let account = `Username: ${username}, Email: ${email}`;
    
    if (age) {
        account += `, Age: ${age}`;
    }
    
    account += `, Role: ${role}, Active: ${isActive}`;
    
    return account;
}

// Get user input
const username = prompt("Enter username: ");
const email = prompt("Enter email: ");
const ageInput = prompt("Enter age (optional): ");
const role = prompt("Enter role (default: user): ") || "user";
const activeInput = prompt("Is user active? (y/n, default: y): ");

const age = ageInput ? parseInt(ageInput) : undefined;
const isActive = activeInput.toLowerCase() === 'n' ? false : true;

console.log("\nCreating user account...");
const userAccount = createUserAccount(username, email, age, role, isActive);
console.log("User Account:", userAccount);

console.log("\n" + "=".repeat(60) + "\n");
console.log("OPTIONAL & DEFAULT PARAMETERS SUMMARY:");
console.log("=".repeat(40));
console.log("OPTIONAL PARAMETERS (?):");
console.log("• Parameter can be undefined");
console.log("• Must check if parameter exists before using");
console.log("• Syntax: function name(param?: type)");
console.log("");
console.log("DEFAULT PARAMETERS (=):");
console.log("• Parameter always has a value");
console.log("• No need to check for undefined");
console.log("• Syntax: function name(param: type = defaultValue)");
console.log("");
console.log("BEST PRACTICES:");
console.log("• Use optional for truly optional parameters");
console.log("• Use default for parameters with sensible defaults");
console.log("• Optional parameters should come after required ones");
console.log("• Default parameters can be anywhere in the parameter list");
