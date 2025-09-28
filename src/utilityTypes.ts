/**
 * TypeScript Utility Types Examples
 * 
 * Utility types are built-in generic types that help transform existing types
 * into new types. They provide powerful type manipulation capabilities.
 */

// ==========================================
// 1. Partial<T> - Makes all properties optional
// ==========================================

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}

// Partial makes all properties optional
type PartialUser = Partial<User>;

function updateUser(id: number, updates: PartialUser): User {
    // In a real application, you'd fetch the existing user and merge updates
    const existingUser: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        isActive: true
    };
    
    return { ...existingUser, ...updates, id }; // Ensure id can't be changed
}

console.log("=== Partial<T> Utility Type ===");
const userUpdates: PartialUser = {
    name: "Jane Doe",
    email: "jane@example.com"
};
console.log("User updates:", updateUser(1,userUpdates));

// ==========================================
// 2. Required<T> - Makes all properties required
// ==========================================

interface OptionalConfig {
    apiUrl?: string;
    timeout?: number;
    retries?: number;
    debug?: boolean;
}

// Required makes all properties mandatory
type RequiredConfig = Required<OptionalConfig>;

function createConfig(config: RequiredConfig): void {
    console.log("Creating config with all required properties:");
    console.log(`API URL: ${config.apiUrl}`);
    console.log(`Timeout: ${config.timeout}ms`);
    console.log(`Retries: ${config.retries}`);
    console.log(`Debug: ${config.debug}`);
}

console.log("\n=== Required<T> Utility Type ===");
const fullConfig: RequiredConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    debug: false
};
createConfig(fullConfig);

// ==========================================
// 3. Pick<T, K> - Selects specific properties
// ==========================================

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Pick only specific properties
type ProductSummary = Pick<Product, "id" | "name" | "price">;
type ProductBasic = Pick<Product, "name" | "description">;

function createProductSummary(product: Product): ProductSummary {
    return {
        id: product.id,
        name: product.name,
        price: product.price
    };
}

function createProductBasic(product: Product): ProductBasic {
    return {
        name: product.name,
        description: product.description
    };
}

console.log("\n=== Pick<T, K> Utility Type ===");
const product: Product = {
    id: 1,
    name: "Laptop",
    description: "High-performance laptop",
    price: 999.99,
    category: "Electronics",
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
};

const summary = createProductSummary(product);
const basic = createProductBasic(product);
console.log("Product summary:", summary);
console.log("Product basic:", basic);

// ==========================================
// 4. Omit<T, K> - Excludes specific properties
// ==========================================

// Omit specific properties
type ProductWithoutTimestamps = Omit<Product, "createdAt" | "updatedAt">;
type ProductWithoutId = Omit<Product, "id">;

function createProductWithoutTimestamps(product: Product): ProductWithoutTimestamps {
    const { createdAt, updatedAt, ...rest } = product;
    return rest;
}

function createNewProduct(productData: ProductWithoutId): Product {
    return {
        ...productData,
        id: Math.floor(Math.random() * 1000), // Generate new ID
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

console.log("\n=== Omit<T, K> Utility Type ===");
const productWithoutTimestamps = createProductWithoutTimestamps(product);
console.log("Product without timestamps:", productWithoutTimestamps);

const newProductData: ProductWithoutId = {
    name: "Smartphone",
    description: "Latest smartphone model",
    price: 699.99,
    category: "Electronics",
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
};
const newProduct = createNewProduct(newProductData);
console.log("New product:", newProduct);

// ==========================================
// 5. Record<K, V> - Creates object type with specific keys and values
// ==========================================

// Record with string keys and string values
// type StringRecord = Record<string, string>; // Removed unused type

// Record with specific keys and values
type StatusRecord = Record<"loading" | "success" | "error", string>;

// Record with number keys and object values
type IndexedUsers = Record<number, User>;

const statusMessages: StatusRecord = {
    loading: "Please wait...",
    success: "Operation completed successfully",
    error: "An error occurred"
};

const userIndex: IndexedUsers = {
    1: { id: 1, name: "Alice", email: "alice@example.com", age: 25, isActive: true },
    2: { id: 2, name: "Bob", email: "bob@example.com", age: 30, isActive: false }
};

console.log("\n=== Record<K, V> Utility Type ===");
console.log("Status messages:", statusMessages);
console.log("User index:", userIndex);

// ==========================================
// 6. Readonly<T> - Makes all properties readonly
// ==========================================

interface MutableConfig {
    apiUrl: string;
    timeout: number;
    retries: number;
}

// Readonly makes all properties immutable
type ReadonlyConfig = Readonly<MutableConfig>;

function createReadonlyConfig(config: MutableConfig): ReadonlyConfig {
    return config;
}

console.log("\n=== Readonly<T> Utility Type ===");
const mutableConfig: MutableConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};

const readonlyConfig = createReadonlyConfig(mutableConfig);
console.log("Readonly config:", readonlyConfig);
// readonlyConfig.apiUrl = "https://new-api.com"; // Error: Cannot assign to 'apiUrl' because it is a read-only property

// ==========================================
// 7. NonNullable<T> - Excludes null and undefined
// ==========================================

// type StringOrNull = string | null; // Removed unused type
// type StringOrUndefined = string | undefined; // Removed unused type
type StringOrNullOrUndefined = string | null | undefined;

// NonNullable removes null and undefined
// type NonNullString = NonNullable<StringOrNull>; // Removed unused type
// type NonUndefinedString = NonNullable<StringOrUndefined>; // Removed unused type
type CleanString = NonNullable<StringOrNullOrUndefined>;

function processString(value: StringOrNullOrUndefined): CleanString | null {
    if (value === null || value === undefined) {
        return null;
    }
    return value; // TypeScript knows this is CleanString
}

console.log("\n=== NonNullable<T> Utility Type ===");
console.log("Processed string:", processString("hello"));
console.log("Processed null:", processString(null));
console.log("Processed undefined:", processString(undefined));

// ==========================================
// 8. Parameters<T> - Extracts parameter types from function
// ==========================================

function createUser(name: string, email: string, age: number, isActive: boolean): User {
    return { id: 0, name, email, age, isActive };
}

// Extract parameter types
type CreateUserParams = Parameters<typeof createUser>;

function callWithParams(params: CreateUserParams): User {
    const [name, email, age, isActive] = params;
    return createUser(name, email, age, isActive);
}

console.log("\n=== Parameters<T> Utility Type ===");
const userParams: CreateUserParams = ["John", "john@example.com", 30, true];
const newUser = callWithParams(userParams);
console.log("New user:", newUser);

// ==========================================
// 9. ReturnType<T> - Extracts return type from function
// ==========================================

function fetchUser(id: number): Promise<User> {
    return Promise.resolve({ id, name: "User", email: "user@example.com", age: 25, isActive: true });
}

// Extract return type
type FetchUserReturn = ReturnType<typeof fetchUser>;

async function handleUserFetch(id: number): Promise<void> {
    const userPromise: FetchUserReturn = fetchUser(id);
    const user = await userPromise;
    console.log("Fetched user:", user);
}

console.log("\n=== ReturnType<T> Utility Type ===");
handleUserFetch(1);

// ==========================================
// 10. ConstructorParameters<T> - Extracts constructor parameter types
// ==========================================

class DatabaseConnection {
    constructor(
        public host: string,
        public port: number,
        public username: string,
        public password: string
    ) {}
}

// Extract constructor parameter types
type DatabaseConfig = ConstructorParameters<typeof DatabaseConnection>;

function createDatabaseConnection(config: DatabaseConfig): DatabaseConnection {
    const [host, port, username, password] = config;
    return new DatabaseConnection(host, port, username, password);
}

console.log("\n=== ConstructorParameters<T> Utility Type ===");
const dbConfig: DatabaseConfig = ["localhost", 5432, "admin", "password"];
const db = createDatabaseConnection(dbConfig);
console.log("Database connection:", db);

// ==========================================
// 11. InstanceType<T> - Extracts instance type from constructor
// ==========================================

// Extract instance type
type DatabaseInstance = InstanceType<typeof DatabaseConnection>;

function processDatabase(db: DatabaseInstance): void {
    console.log(`Connected to ${db.host}:${db.port} as ${db.username}`);
}

console.log("\n=== InstanceType<T> Utility Type ===");
processDatabase(db);

// ==========================================
// 12. ThisParameterType<T> - Extracts 'this' parameter type
// ==========================================

interface Context {
    userId: number;
    permissions: string[];
}

function processWithContext(this: Context, data: string): string {
    return `User ${this.userId} processed: ${data}`;
}

// Extract 'this' parameter type
type ProcessContext = ThisParameterType<typeof processWithContext>;

function createContextualProcessor(context: ProcessContext) {
    return processWithContext.bind(context);
}

console.log("\n=== ThisParameterType<T> Utility Type ===");
const context: ProcessContext = {
    userId: 123,
    permissions: ["read", "write"]
};
const processor = createContextualProcessor(context);
console.log(processor("some data"));

// ==========================================
// 13. OmitThisParameter<T> - Removes 'this' parameter
// ==========================================

// Remove 'this' parameter
// type ProcessFunction = OmitThisParameter<typeof processWithContext>; // Removed unused type

// function callProcessFunction(fn: ProcessFunction, data: string): string {
//     // This would normally require a 'this' context, but we've removed it
//     return fn(data);
// }

console.log("\n=== OmitThisParameter<T> Utility Type ===");
// Note: This would cause a runtime error because the function expects 'this'
// console.log(callProcessFunction(processWithContext, "test"));

// ==========================================
// 14. ThisType<T> - Specifies 'this' type in object literals
// ==========================================

interface CalculatorMethods {
    add(x: number, y: number): number;
    subtract(x: number, y: number): number;
    multiply(x: number, y: number): number;
    divide(x: number, y: number): number;
}

interface CalculatorState {
    result: number;
}

type Calculator = CalculatorMethods & ThisType<CalculatorState>;

function createCalculator(): Calculator {
    return {
        add(x: number, y: number): number {
            this.result = x + y;
            return this.result;
        },
        subtract(x: number, y: number): number {
            this.result = x - y;
            return this.result;
        },
        multiply(x: number, y: number): number {
            this.result = x * y;
            return this.result;
        },
        divide(x: number, y: number): number {
            this.result = x / y;
            return this.result;
        }
    };
}

console.log("\n=== ThisType<T> Utility Type ===");
const calculator = createCalculator();
console.log("Calculator result:", calculator.add(5, 3));
console.log("Calculator result:", calculator.multiply(4, 2));

// ==========================================
// 15. Combining Utility Types
// ==========================================

interface ComplexUser {
    id: number;
    name: string;
    email: string;
    age: number;
    address: {
        street: string;
        city: string;
        country: string;
    };
    preferences: {
        theme: "light" | "dark";
        language: string;
        notifications: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

// Complex utility type combinations
type UserUpdate = Partial<Pick<ComplexUser, "name" | "email" | "age">>;
type UserPublic = Omit<ComplexUser, "email" | "preferences">;
// type UserMinimal = Pick<ComplexUser, "id" | "name">; // Removed unused type
// type UserWithoutTimestamps = Omit<ComplexUser, "createdAt" | "updatedAt">; // Removed unused type
// type ReadonlyUser = Readonly<ComplexUser>; // Removed unused type

function demonstrateUtilityCombinations() {
    console.log("\n=== Combining Utility Types ===");
    
    const userUpdate: UserUpdate = {
        name: "Updated Name",
        email: "updated@example.com"
    };
    console.log("User update:", userUpdate);
    
    const publicUser: UserPublic = {
        id: 1,
        name: "John Doe",
        age: 30,
        address: {
            street: "123 Main St",
            city: "New York",
            country: "USA"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    };
    console.log("Public user:", publicUser);
}

demonstrateUtilityCombinations();

export {
    updateUser,
    createConfig,
    createProductSummary,
    createProductBasic,
    createProductWithoutTimestamps,
    createNewProduct,
    processString,
    callWithParams,
    handleUserFetch,
    createDatabaseConnection,
    processDatabase,
    createContextualProcessor,
    createCalculator,
    demonstrateUtilityCombinations
};
