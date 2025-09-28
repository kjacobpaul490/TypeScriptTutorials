function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function isEmail(value: unknown): value is string {
    return isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Using custom type guards
function processUnknownValue(value: unknown) {
  
    if (isEmail(value)) {
        // TypeScript knows value is a valid email string here
        console.log(`Email: ${value} (valid email format)`);
    }
    else if (isNumber(value)) {
        // TypeScript knows value is number here
        console.log(`Number: ${value * 2}`);
    } else   if (isString(value)) {
        // TypeScript knows value is string here
        console.log(`String: ${value.toUpperCase()}`);
    } else {
        console.log("Unknown type");
    }
}

// Example usage
console.log("\n=== Custom Type Guards ===");
processUnknownValue("hello world");
processUnknownValue(42);
processUnknownValue("user@example.com");
processUnknownValue(true);