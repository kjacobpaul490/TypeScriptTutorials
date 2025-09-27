# Higher-Order Functions & Callbacks with TypeScript

This directory contains comprehensive examples of higher-order functions and callbacks with proper TypeScript typing. The examples demonstrate various patterns and best practices for functional programming in TypeScript.

## Files Overview

### 1. `higherOrderFunctions.ts`
Basic and advanced higher-order function patterns with TypeScript types.

**Key Concepts:**
- Basic callback types
- Custom array functions (map, filter, reduce)
- Debouncing and throttling
- Function composition and currying
- Event systems with typed callbacks

**Key Features:**
```typescript
// Basic callback types
type StringCallback = (str: string) => void;

// Generic callback type
type Callback<T> = (value: T) => void;

// Custom map with proper typing
const customMap = <T, U>(
    array: T[], 
    callback: (item: T, index: number) => U
): U[] => { /* implementation */ };

// Debouncing
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => { /* implementation */ };
```

### 2. `callbackExamples.ts`
Practical examples using a user management system with callbacks.

**Key Concepts:**
- User service with callback-based operations
- Filter and validation functions
- Event-driven architecture
- Memoization and rate limiting
- Function composition patterns

**Key Features:**
```typescript
// User service with callbacks
class UserService {
    addUser(user: User, validationCallback?: UserValidationCallback): boolean;
    getUsers(filterCallback?: UserFilterCallback): User[];
    updateUser(userId: string, transformCallback: UserTransformCallback): boolean;
}

// Filter functions
const createAgeFilter = (minAge: number, maxAge: number): UserFilterCallback => {
    return (user: User) => user.age >= minAge && user.age <= maxAge;
};

// Memoization
const memoize = <T extends (...args: any[]) => any>(
    fn: T,
    keyGenerator?: (...args: Parameters<T>) => string
): T => { /* implementation */ };
```

### 3. `asyncCallbacks.ts`
Advanced async patterns with callbacks and error handling.

**Key Concepts:**
- Async callback types
- Retry mechanisms with exponential backoff
- Circuit breaker pattern
- Timeout wrappers
- Async event systems
- Batch processing with concurrency control

**Key Features:**
```typescript
// Async callback types
type AsyncCallback<T> = (value: T) => Promise<void>;
type AsyncErrorCallback = (error: Error) => Promise<void>;

// Retry with backoff
const retryAsync = <T>(
    operation: AsyncOperation<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): AsyncOperation<T> => { /* implementation */ };

// Circuit breaker
const circuitBreaker = <T>(
    operation: AsyncOperation<T>,
    failureThreshold: number = 5,
    timeoutMs: number = 60000
): AsyncOperation<T> => { /* implementation */ };
```

## Key TypeScript Patterns

### 1. Callback Type Definitions
```typescript
// Basic callback types
type StringCallback = (str: string) => void;
type NumberCallback = (num: number) => void;

// Generic callback type
type Callback<T> = (value: T) => void;

// Async callback types
type AsyncCallback<T> = (value: T) => Promise<void>;
type AsyncErrorCallback = (error: Error) => Promise<void>;
```

### 2. Higher-Order Function Patterns
```typescript
// Function that takes a callback
const executeCallback = (callback: StringCallback, message: string): void => {
    callback(message);
};

// Function that returns a callback
const createGreetingCallback = (name: string): StringCallback => {
    return (greeting: string) => {
        console.log(`${greeting}, ${name}!`);
    };
};
```

### 3. Generic Higher-Order Functions
```typescript
// Generic map function
const customMap = <T, U>(
    array: T[], 
    callback: (item: T, index: number) => U
): U[] => {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i));
    }
    return result;
};
```

### 4. Advanced Patterns
```typescript
// Function composition
const compose = <T>(...functions: Array<(arg: T) => T>) => {
    return (value: T): T => {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
};

// Currying
const curry = <T extends (...args: any[]) => any>(
    fn: T
): ((...args: any[]) => any) => {
    return (...args: any[]) => {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return (...moreArgs: any[]) => curry(fn)(...args, ...moreArgs);
    };
};
```

## Best Practices

### 1. Type Safety
- Always define explicit types for callbacks
- Use generic types for reusable callback patterns
- Leverage TypeScript's type inference where appropriate

### 2. Error Handling
- Implement proper error handling in async callbacks
- Use try-catch blocks in callback execution
- Provide fallback mechanisms for failed operations

### 3. Performance Considerations
- Use memoization for expensive operations
- Implement rate limiting for high-frequency callbacks
- Consider debouncing and throttling for UI interactions

### 4. Testing
- Test callback functions in isolation
- Mock dependencies when testing higher-order functions
- Use async/await patterns for testing async callbacks

## Usage Examples

### Basic Callback Usage
```typescript
const logMessage: StringCallback = (message) => {
    console.log(`Logged: ${message}`);
};

executeCallback(logMessage, "Hello from callback!");
```

### Async Callback Usage
```typescript
const asyncEventEmitter = new AsyncEventEmitter();

asyncEventEmitter.on('data-loaded', async (data) => {
    console.log(`Data loaded: ${data.data.length} items`);
});

await asyncEventEmitter.emit('data-loaded', {
    data: [1, 2, 3, 4, 5],
    timestamp: new Date()
});
```

### Function Composition
```typescript
const addOne = (x: number) => x + 1;
const multiplyByTwo = (x: number) => x * 2;
const subtractThree = (x: number) => x - 3;

const composed = compose(addOne, multiplyByTwo, subtractThree);
console.log(composed(3)); // ((3-3)*2)+1 = 1
```

## Running the Examples

To run the examples, you can:

1. **Compile TypeScript:**
   ```bash
   npx tsc
   ```

2. **Run specific examples:**
   ```bash
   node dist/higherOrderFunctions.js
   node dist/callbackExamples.js
   node dist/asyncCallbacks.js
   ```

3. **Run the async demo:**
   ```typescript
   import { runAsyncDemo } from './asyncCallbacks';
   runAsyncDemo().catch(console.error);
   ```

## Common Patterns

### 1. Event-Driven Architecture
- Use typed event emitters for loose coupling
- Implement proper error handling in event listeners
- Consider using async event processing for heavy operations

### 2. Functional Programming
- Prefer pure functions when possible
- Use function composition for complex transformations
- Implement currying for partial application

### 3. Async Operations
- Use retry mechanisms for unreliable operations
- Implement circuit breakers for fault tolerance
- Consider timeout wrappers for long-running operations

This comprehensive guide provides everything you need to understand and implement higher-order functions and callbacks with proper TypeScript typing in your applications.
