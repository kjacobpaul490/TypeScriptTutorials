/**
 * TypeScript Mapped Types Examples
 * 
 * Mapped types allow you to create new types by transforming existing types.
 * They iterate over the keys of an existing type and create a new type with
 * transformed properties.
 */

// ==========================================
// 1. Basic Mapped Types
// ==========================================

interface OriginalType {
    name: string;
    age: number;
    email: string;
}

// Make all properties optional
type Optional<T> = {
    [K in keyof T]?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

// Make all properties non-nullable
type NonNullable<T> = {
    [K in keyof T]: NonNullable<T[K]>;
};

console.log("=== Basic Mapped Types ===");
type OptionalUser = Optional<OriginalType>;
type ReadonlyUser = Readonly<OriginalType>;
type NullableUser = Nullable<OriginalType>;

// ==========================================
// 2. Mapped Types with Key Transformation
// ==========================================

// Add prefix to all keys
type AddPrefix<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K];
};

// Add suffix to all keys
type AddSuffix<T, S extends string> = {
    [K in keyof T as `${string & K}${S}`]: T[K];
};

// Convert keys to uppercase
type UppercaseKeys<T> = {
    [K in keyof T as Uppercase<string & K>]: T[K];
};

// Convert keys to lowercase
type LowercaseKeys<T> = {
    [K in keyof T as Lowercase<string & K>]: T[K];
};

interface UserConfig {
    firstName: string;
    lastName: string;
    emailAddress: string;
}

type PrefixedConfig = AddPrefix<UserConfig, "user_">;
type SuffixedConfig = AddSuffix<UserConfig, "_config">;
type UppercaseConfig = UppercaseKeys<UserConfig>;
type LowercaseConfig = LowercaseKeys<UserConfig>;

console.log("\n=== Mapped Types with Key Transformation ===");
// Example usage
const prefixedConfig: PrefixedConfig = {
    user_firstName: "John",
    user_lastName: "Doe",
    user_emailAddress: "john@example.com"
};

const suffixedConfig: SuffixedConfig = {
    firstName_config: "John",
    lastName_config: "Doe",
    emailAddress_config: "john@example.com"
};

console.log("Prefixed config:", prefixedConfig);
console.log("Suffixed config:", suffixedConfig);

// ==========================================
// 3. Mapped Types with Value Transformation
// ==========================================

// Convert all values to strings
type Stringify<T> = {
    [K in keyof T]: string;
};

// Convert all values to functions
type Functionify<T> = {
    [K in keyof T]: () => T[K];
};

// Wrap all values in arrays
type Arrayify<T> = {
    [K in keyof T]: T[K][];
};

// Make all values optional and nullable
type OptionalNullable<T> = {
    [K in keyof T]?: T[K] | null;
};

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

type StringifiedProduct = Stringify<Product>;
type FunctionifiedProduct = Functionify<Product>;
type ArrayifiedProduct = Arrayify<Product>;
type OptionalNullableProduct = OptionalNullable<Product>;

console.log("\n=== Mapped Types with Value Transformation ===");
const stringifiedProduct: StringifiedProduct = {
    id: "1",
    name: "Laptop",
    price: "999.99",
    inStock: "true"
};

console.log("Stringified product:", stringifiedProduct);

// ==========================================
// 4. Conditional Mapped Types
// ==========================================

// Only include string properties
type StringProperties<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Only include number properties
type NumberProperties<T> = {
    [K in keyof T as T[K] extends number ? K : never]: T[K];
};

// Only include function properties
type FunctionProperties<T> = {
    [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

// Exclude specific property types
type ExcludeStrings<T> = {
    [K in keyof T as T[K] extends string ? never : K]: T[K];
};

interface MixedType {
    name: string;
    age: number;
    email: string;
    isActive: boolean;
    calculate: () => number;
    id: number;
}

type StringProps = StringProperties<MixedType>;
type NumberProps = NumberProperties<MixedType>;
type FunctionProps = FunctionProperties<MixedType>;
type NonStringProps = ExcludeStrings<MixedType>;

console.log("\n=== Conditional Mapped Types ===");
const stringProps: StringProps = {
    name: "John",
    email: "john@example.com"
};

const numberProps: NumberProps = {
    age: 30,
    id: 1
};

console.log("String properties:", stringProps);
console.log("Number properties:", numberProps);

// ==========================================
// 5. Mapped Types with Template Literals
// ==========================================

// Create getter methods
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Create setter methods
type Setters<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Create both getters and setters
type Accessors<T> = Getters<T> & Setters<T>;

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

type PersonGetters = Getters<Person>;
type PersonSetters = Setters<Person>;
type PersonAccessors = Accessors<Person>;

console.log("\n=== Mapped Types with Template Literals ===");
// Example implementation
class PersonClass implements PersonAccessors {
    constructor(
        public firstName: string,
        public lastName: string,
        public age: number
    ) {}

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getAge(): number {
        return this.age;
    }

    setFirstName(value: string): void {
        this.firstName = value;
    }

    setLastName(value: string): void {
        this.lastName = value;
    }

    setAge(value: number): void {
        this.age = value;
    }
}

const person = new PersonClass("John", "Doe", 30);
console.log("Person getters:", {
    firstName: person.getFirstName(),
    lastName: person.getLastName(),
    age: person.getAge()
});

// ==========================================
// 6. Mapped Types with Union Types
// ==========================================

// Create a type with all possible combinations
type AllCombinations<T extends string> = {
    [K in T]: K;
};

// Create a type that maps each key to its own type
type SelfMap<T extends string> = {
    [K in T]: K;
};

// Create a type that maps each key to a function that returns that key
type KeyFunctions<T extends string> = {
    [K in T]: () => K;
};

type Status = "loading" | "success" | "error";

type StatusMap = AllCombinations<Status>;
type StatusSelfMap = SelfMap<Status>;
type StatusKeyFunctions = KeyFunctions<Status>;

console.log("\n=== Mapped Types with Union Types ===");
const statusMap: StatusMap = {
    loading: "loading",
    success: "success",
    error: "error"
};

const statusKeyFunctions: StatusKeyFunctions = {
    loading: () => "loading",
    success: () => "success",
    error: () => "error"
};

console.log("Status map:", statusMap);
console.log("Status key functions:", statusKeyFunctions);

// ==========================================
// 7. Mapped Types with Nested Objects
// ==========================================

// Deep readonly
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Deep partial
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Deep nullable
type DeepNullable<T> = {
    [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> | null : T[K] | null;
};

interface NestedObject {
    user: {
        id: number;
        profile: {
            name: string;
            email: string;
        };
        settings: {
            theme: "light" | "dark";
            notifications: boolean;
        };
    };
    config: {
        apiUrl: string;
        timeout: number;
    };
}

type DeepReadonlyNested = DeepReadonly<NestedObject>;
type DeepPartialNested = DeepPartial<NestedObject>;
type DeepNullableNested = DeepNullable<NestedObject>;

console.log("\n=== Mapped Types with Nested Objects ===");
const deepPartialNested: DeepPartialNested = {
    user: {
        profile: {
            name: "John"
            // email is optional
        }
        // settings is optional
    }
    // config is optional
};

console.log("Deep partial nested:", deepPartialNested);

// ==========================================
// 8. Mapped Types with Generic Constraints
// ==========================================

// Extract keys that match a specific type
type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Extract properties that match a specific type
type PropertiesOfType<T, U> = Pick<T, KeysOfType<T, U>>;

// Create a type that maps each key to its type
type TypeMap<T> = {
    [K in keyof T]: T[K];
};

interface ApiResponse {
    data: any;
    status: number;
    message: string;
    timestamp: Date;
    success: boolean;
}

type StringKeys = KeysOfType<ApiResponse, string>;
type StringProperties = PropertiesOfType<ApiResponse, string>;
type NumberKeys = KeysOfType<ApiResponse, number>;
type NumberProperties = PropertiesOfType<ApiResponse, number>;

console.log("\n=== Mapped Types with Generic Constraints ===");
const stringProperties: StringProperties = {
    message: "Success"
};

const numberProperties: NumberProperties = {
    status: 200
};

console.log("String properties:", stringProperties);
console.log("Number properties:", numberProperties);

// ==========================================
// 9. Mapped Types with Conditional Logic
// ==========================================

// Create a type that makes all properties optional except specified ones
type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Create a type that makes all properties required except specified ones
type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>;

// Create a type that transforms properties based on their names
type TransformByKey<T, U> = {
    [K in keyof T]: K extends keyof U ? U[K] : T[K];
};

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

type PartialExceptId = PartialExcept<User, "id">;
type RequiredExceptPassword = RequiredExcept<User, "password">;

console.log("\n=== Mapped Types with Conditional Logic ===");
const partialExceptId: PartialExceptId = {
    id: 1,
    name: "John"
    // email and other properties are optional
};

const requiredExceptPassword: RequiredExceptPassword = {
    id: 1,
    name: "John",
    email: "john@example.com",
    createdAt: new Date()
    // password is optional
};

console.log("Partial except ID:", partialExceptId);
console.log("Required except password:", requiredExceptPassword);

// ==========================================
// 10. Mapped Types with Recursive Patterns
// ==========================================

// Create a type that maps each key to a function that takes the original value
type FunctionMap<T> = {
    [K in keyof T]: (value: T[K]) => T[K];
};

// Create a type that maps each key to a validation function
type Validators<T> = {
    [K in keyof T]: (value: T[K]) => boolean;
};

// Create a type that maps each key to a transformer function
type Transformers<T> = {
    [K in keyof T]: (value: T[K]) => any;
};

interface FormData {
    username: string;
    email: string;
    age: number;
    password: string;
}

type FormValidators = Validators<FormData>;
type FormTransformers = Transformers<FormData>;

console.log("\n=== Mapped Types with Recursive Patterns ===");
const formValidators: FormValidators = {
    username: (value) => value.length >= 3,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    age: (value) => value >= 18,
    password: (value) => value.length >= 8
};

const formTransformers: FormTransformers = {
    username: (value) => value.toLowerCase(),
    email: (value) => value.toLowerCase(),
    age: (value) => Math.max(0, value),
    password: (value) => value // Don't transform passwords
};

console.log("Form validators:", formValidators);
console.log("Form transformers:", formTransformers);

// ==========================================
// 11. Mapped Types with Index Signatures
// ==========================================

// Create a type that maps string keys to specific values
type StringKeyMap<T extends string> = {
    [K in T]: string;
};

// Create a type that maps string keys to functions
type StringKeyFunctions<T extends string> = {
    [K in T]: () => void;
};

// Create a type that maps string keys to objects
type StringKeyObjects<T extends string> = {
    [K in T]: { value: string; type: string };
};

type ActionTypes = "create" | "read" | "update" | "delete";

type ActionMap = StringKeyMap<ActionTypes>;
type ActionFunctions = StringKeyFunctions<ActionTypes>;
type ActionObjects = StringKeyObjects<ActionTypes>;

console.log("\n=== Mapped Types with Index Signatures ===");
const actionMap: ActionMap = {
    create: "Create new resource",
    read: "Read existing resource",
    update: "Update existing resource",
    delete: "Delete existing resource"
};

const actionFunctions: ActionFunctions = {
    create: () => console.log("Creating..."),
    read: () => console.log("Reading..."),
    update: () => console.log("Updating..."),
    delete: () => console.log("Deleting...")
};

console.log("Action map:", actionMap);

// ==========================================
// 12. Complex Mapped Types
// ==========================================

// Create a type that maps each property to a getter and setter
type PropertyAccessors<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
    [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Create a type that maps each property to a validation function
type PropertyValidators<T> = {
    [K in keyof T as `validate${Capitalize<string & K>}`]: (value: T[K]) => boolean;
};

// Create a type that maps each property to a transformer function
type PropertyTransformers<T> = {
    [K in keyof T as `transform${Capitalize<string & K>}`]: (value: T[K]) => T[K];
};

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

type ProductAccessors = PropertyAccessors<Product>;
type ProductValidators = PropertyValidators<Product>;
type ProductTransformers = PropertyTransformers<Product>;

console.log("\n=== Complex Mapped Types ===");
// Example implementation
class ProductManager implements ProductAccessors {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public description: string
    ) {}

    getId(): number { return this.id; }
    getName(): string { return this.name; }
    getPrice(): number { return this.price; }
    getDescription(): string { return this.description; }

    setId(value: number): void { this.id = value; }
    setName(value: string): void { this.name = value; }
    setPrice(value: number): void { this.price = value; }
    setDescription(value: string): void { this.description = value; }
}

const productManager = new ProductManager(1, "Laptop", 999.99, "High-performance laptop");
console.log("Product accessors:", {
    id: productManager.getId(),
    name: productManager.getName(),
    price: productManager.getPrice(),
    description: productManager.getDescription()
});

export {
    Optional,
    Readonly,
    Nullable,
    NonNullable,
    AddPrefix,
    AddSuffix,
    UppercaseKeys,
    LowercaseKeys,
    Stringify,
    Functionify,
    Arrayify,
    OptionalNullable,
    StringProperties,
    NumberProperties,
    FunctionProperties,
    ExcludeStrings,
    Getters,
    Setters,
    Accessors,
    AllCombinations,
    SelfMap,
    KeyFunctions,
    DeepReadonly,
    DeepPartial,
    DeepNullable,
    KeysOfType,
    PropertiesOfType,
    PartialExcept,
    RequiredExcept,
    TransformByKey,
    FunctionMap,
    Validators,
    Transformers,
    StringKeyMap,
    StringKeyFunctions,
    StringKeyObjects,
    PropertyAccessors,
    PropertyValidators,
    PropertyTransformers
};
