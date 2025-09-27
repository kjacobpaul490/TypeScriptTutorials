// Higher-Order Functions & Callbacks with TypeScript Types

// ============================================================================
// 1. Basic Callback Types
// ============================================================================

// Define callback function types
type StringCallback = (str: string) => void;

// ============================================================================
// 2. Higher-Order Functions with Callbacks
// ============================================================================

// Function that takes a callback and executes it
const executeCallback = (callback: StringCallback, message: string): void => {
    console.log("Executing callback...");
    callback(message);
};

// Function that returns a callback
const createGreetingCallback = (name: string): StringCallback => {
    return (greeting: string) => {
        console.log(`${greeting}, ${name}!`);
    };
};

// ============================================================================
// 3. Array Higher-Order Functions with Types
// ============================================================================

// Custom map function with proper typing
const customMap = <T, U>(
    array: T[], 
    callback: (item: T, index: number) => U
): U[] => {
    const result: U[] = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item !== undefined) {
            result.push(callback(item, i));
        }
    }
    return result;
};

// Custom filter function with proper typing
const customFilter = <T>(
    array: T[], 
    predicate: (item: T, index: number) => boolean
): T[] => {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item !== undefined && predicate(item, i)) {
            result.push(item);
        }
    }
    return result;
};

// Custom reduce function with proper typing
const customReduce = <T, U>(
    array: T[], 
    reducer: (accumulator: U, current: T, index: number) => U,
    initialValue: U
): U => {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item !== undefined) {
            accumulator = reducer(accumulator, item, i);
        }
    }
    return accumulator;
};

// ============================================================================
// 4. Advanced Higher-Order Functions
// ============================================================================

// Function that creates a debounced version of a callback
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Function that creates a throttled version of a callback
const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ============================================================================
// 5. Promise-based Higher-Order Functions
// ============================================================================

// Function that retries a callback with exponential backoff
const retryWithBackoff = async <T>(
    callback: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await callback();
        } catch (error) {
            lastError = error as Error;
            if (attempt === maxRetries) {
                throw lastError;
            }
            
            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError!;
};

// ============================================================================
// 6. Event System with Callbacks
// ============================================================================

// Event listener types
type EventCallback<T = any> = (data: T) => void;
type EventMap = {
    'user-login': { userId: string; timestamp: Date };
    'user-logout': { userId: string; sessionDuration: number };
    'data-updated': { data: any[]; count: number };
};

// Event emitter class with proper typing
class TypedEventEmitter {
    private listeners: Map<keyof EventMap, EventCallback[]> = new Map();

    // Add event listener
    on<K extends keyof EventMap>(
        event: K, 
        callback: EventCallback<EventMap[K]>
    ): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    // Remove event listener
    off<K extends keyof EventMap>(
        event: K, 
        callback: EventCallback<EventMap[K]>
    ): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            const index = eventListeners.indexOf(callback);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }

    // Emit event
    emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.forEach(callback => callback(data));
        }
    }
}

// ============================================================================
// 7. Functional Programming Patterns
// ============================================================================

// Compose function - combines multiple functions
const compose = <T>(...functions: Array<(arg: T) => T>) => {
    return (value: T): T => {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
};

// Pipe function - similar to compose but left-to-right
const pipe = <T>(...functions: Array<(arg: T) => T>) => {
    return (value: T): T => {
        return functions.reduce((acc, fn) => fn(acc), value);
    };
};

// Currying function
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

// ============================================================================
// 8. Usage Examples
// ============================================================================

// Example 1: Basic callback usage
const logMessage: StringCallback = (message) => {
    console.log(`Logged: ${message}`);
};

executeCallback(logMessage, "Hello from callback!");

// Example 2: Using custom array functions
const numbers = [1, 2, 3, 4, 5];
const doubled = customMap(numbers, (num) => num * 2);
const evens = customFilter(numbers, (num) => num % 2 === 0);
const sum = customReduce(numbers, (acc, num) => acc + num, 0);

console.log("Original:", numbers);
console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);

// Example 3: Using debounced function
const debouncedLog = debounce((message: string) => {
    console.log(`Debounced: ${message}`);
}, 1000);

// Use the debounced function
debouncedLog("This message will be debounced");

// Example 4: Using event emitter
const eventEmitter = new TypedEventEmitter();

eventEmitter.on('user-login', (data) => {
    console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

eventEmitter.on('data-updated', (data) => {
    console.log(`Data updated: ${data.count} items`);
});

// Example 5: Using compose and pipe
const addOne = (x: number) => x + 1;
const multiplyByTwo = (x: number) => x * 2;
const subtractThree = (x: number) => x - 3;

const composed = compose(addOne, multiplyByTwo, subtractThree);
const piped = pipe(subtractThree, multiplyByTwo, addOne);

console.log("Composed (3):", composed(3)); // ((3-3)*2)+1 = 1
console.log("Piped (3):", piped(3)); // (((3-3)*2)+1) = 1

// Example 6: Using currying
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);
const addFive = curriedAdd(5);
const addFiveAndThree = addFive(3);

console.log("Curried add:", addFiveAndThree(2)); // 5 + 3 + 2 = 10

// Example 7: Using retry with backoff
const fetchData = async (): Promise<string> => {
    // Simulate API call that might fail
    if (Math.random() > 0.7) {
        return "Data fetched successfully!";
    } else {
        throw new Error("API call failed");
    }
};

// Test retry functionality
retryWithBackoff(fetchData, 3, 1000)
    .then(result => console.log("Retry result:", result))
    .catch(error => console.error("All retries failed:", error));

export {
    executeCallback,
    createGreetingCallback,
    customMap,
    customFilter,
    customReduce,
    debounce,
    throttle,
    retryWithBackoff,
    TypedEventEmitter,
    compose,
    pipe,
    curry
};
