// Async Callbacks and Error Handling with TypeScript
// Advanced patterns for asynchronous operations

// ============================================================================
// Type Definitions for Async Operations
// ============================================================================

// Basic async callback types
type AsyncCallback<T> = (value: T) => Promise<void>;
type AsyncErrorCallback = (error: Error) => Promise<void>;
type AsyncFinallyCallback = () => Promise<void>;

// Generic async operation types
type AsyncOperation<T> = () => Promise<T>;
type AsyncTransform<T, U> = (value: T) => Promise<U>;
type AsyncPredicate<T> = (value: T) => Promise<boolean>;

// Promise-based callback types
type PromiseCallback<T> = (value: T) => Promise<any>;
type PromiseErrorCallback = (error: Error) => Promise<any>;

// ============================================================================
// Async Higher-Order Functions
// ============================================================================

// Function that retries async operations with exponential backoff
const retryAsync = <T>(
    operation: AsyncOperation<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
    onRetry?: (attempt: number, error: Error) => Promise<void>
): AsyncOperation<T> => {
    return async (): Promise<T> => {
        let lastError: Error;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error as Error;
                
                if (attempt === maxRetries) {
                    throw lastError;
                }
                
                if (onRetry) {
                    await onRetry(attempt + 1, lastError);
                }
                
                const delay = baseDelay * Math.pow(2, attempt);
                console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw lastError!;
    };
};

// Function that creates a timeout wrapper for async operations
const withTimeout = <T>(
    operation: AsyncOperation<T>,
    timeoutMs: number,
    timeoutMessage: string = 'Operation timed out'
): AsyncOperation<T> => {
    return async (): Promise<T> => {
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
        });
        
        return Promise.race([operation(), timeoutPromise]);
    };
};

// Function that creates a circuit breaker for async operations
const circuitBreaker = <T>(
    operation: AsyncOperation<T>,
    failureThreshold: number = 5,
    timeoutMs: number = 60000
): AsyncOperation<T> => {
    let failures = 0;
    let lastFailureTime = 0;
    let state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
    
    return async (): Promise<T> => {
        const now = Date.now();
        
        // Check if circuit should be reset
        if (state === 'OPEN' && now - lastFailureTime > timeoutMs) {
            state = 'HALF_OPEN';
        }
        
        // Reject if circuit is open
        if (state === 'OPEN') {
            throw new Error('Circuit breaker is OPEN');
        }
        
        try {
            const result = await operation();
            
            // Reset on success
            if (state === 'HALF_OPEN') {
                state = 'CLOSED';
                failures = 0;
            }
            
            return result;
        } catch (error) {
            failures++;
            lastFailureTime = now;
            
            if (failures >= failureThreshold) {
                state = 'OPEN';
            }
            
            throw error;
        }
    };
};

// ============================================================================
// Async Event System
// ============================================================================

interface AsyncEventMap {
    'data-loaded': { data: any[]; timestamp: Date };
    'error-occurred': { error: Error; context: string };
    'operation-completed': { operation: string; duration: number };
}

class AsyncEventEmitter {
    private listeners: Map<keyof AsyncEventMap, AsyncCallback<any>[]> = new Map();
    private errorHandlers: AsyncErrorCallback[] = [];

    // Add async event listener
    async on<K extends keyof AsyncEventMap>(
        event: K,
        callback: AsyncCallback<AsyncEventMap[K]>
    ): Promise<void> {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    // Add global error handler
    async onError(callback: AsyncErrorCallback): Promise<void> {
        this.errorHandlers.push(callback);
    }

    // Emit event asynchronously
    async emit<K extends keyof AsyncEventMap>(
        event: K,
        data: AsyncEventMap[K]
    ): Promise<void> {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            const promises = eventListeners.map(async (callback) => {
                try {
                    await callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                    await this.handleError(error as Error);
                }
            });
            
            await Promise.allSettled(promises);
        }
    }

    // Handle errors
    private async handleError(error: Error): Promise<void> {
        const promises = this.errorHandlers.map(async (handler) => {
            try {
                await handler(error);
            } catch (handlerError) {
                console.error('Error in error handler:', handlerError);
            }
        });
        
        await Promise.allSettled(promises);
    }
}

// ============================================================================
// Async Data Processing Pipeline
// ============================================================================

// Generic async pipeline processor
class AsyncPipeline<T> {
    private operations: AsyncTransform<T, T>[] = [];
    private errorHandlers: Map<string, AsyncErrorCallback> = new Map();

    // Add transformation to pipeline
    addTransform(name: string, transform: AsyncTransform<T, T>): this {
        this.operations.push(transform);
        return this;
    }

    // Add error handler for specific operation
    addErrorHandler(operationName: string, handler: AsyncErrorCallback): this {
        this.errorHandlers.set(operationName, handler);
        return this;
    }

    // Process data through pipeline
    async process(data: T): Promise<T> {
        let result = data;
        
        for (let i = 0; i < this.operations.length; i++) {
            try {
                result = await this.operations[i](result);
            } catch (error) {
                const operationName = `operation_${i}`;
                const handler = this.errorHandlers.get(operationName);
                
                if (handler) {
                    await handler(error as Error);
                } else {
                    throw error;
                }
            }
        }
        
        return result;
    }
}

// ============================================================================
// Async Batch Processing
// ============================================================================

// Process items in batches with concurrency control
const processBatch = async <T, U>(
    items: T[],
    processor: AsyncTransform<T, U>,
    batchSize: number = 5,
    concurrency: number = 3
): Promise<U[]> => {
    const results: U[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        
        // Process batch with concurrency control
        const batchPromises = batch.map(async (item) => {
            return await processor(item);
        });
        
        // Limit concurrency
        const limitedPromises = [];
        for (let j = 0; j < batchPromises.length; j += concurrency) {
            const concurrentBatch = batchPromises.slice(j, j + concurrency);
            const batchResults = await Promise.allSettled(concurrentBatch);
            
            for (const result of batchResults) {
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                } else {
                    console.error('Batch processing error:', result.reason);
                }
            }
        }
    }
    
    return results;
};

// ============================================================================
// Usage Examples
// ============================================================================

// Example 1: Async retry with callbacks
const simulateApiCall = async (): Promise<string> => {
    const success = Math.random() > 0.7;
    if (success) {
        return "API call successful!";
    } else {
        throw new Error("API call failed");
    }
};

const retryableApiCall = retryAsync(
    simulateApiCall,
    3,
    1000,
    async (attempt, error) => {
        console.log(`Retry attempt ${attempt} for error: ${error.message}`);
    }
);

// Example 2: Timeout wrapper
const timeoutApiCall = withTimeout(
    simulateApiCall,
    2000,
    "API call timed out after 2 seconds"
);

// Example 3: Circuit breaker
const circuitBreakerApiCall = circuitBreaker(
    simulateApiCall,
    3,
    10000
);

// Example 4: Async event emitter
const asyncEventEmitter = new AsyncEventEmitter();

// Add event listeners
asyncEventEmitter.on('data-loaded', async (data) => {
    console.log(`📊 Data loaded: ${data.data.length} items at ${data.timestamp}`);
});

asyncEventEmitter.on('error-occurred', async (error) => {
    console.log(`❌ Error occurred: ${error.error.message} in ${error.context}`);
});

asyncEventEmitter.onError(async (error) => {
    console.log(`🚨 Global error handler: ${error.message}`);
});

// Example 5: Async pipeline
const dataPipeline = new AsyncPipeline<any>()
    .addTransform('validate', async (data) => {
        console.log('Validating data...');
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format');
        }
        return data;
    })
    .addTransform('enrich', async (data) => {
        console.log('Enriching data...');
        return { ...data, enriched: true, timestamp: new Date() };
    })
    .addTransform('transform', async (data) => {
        console.log('Transforming data...');
        return { ...data, processed: true };
    })
    .addErrorHandler('validate', async (error) => {
        console.log('Validation error handled:', error.message);
    });

// Example 6: Batch processing
const processUserData = async (user: any) => {
    console.log(`Processing user: ${user.name}`);
    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 100));
    return { ...user, processed: true };
};

// ============================================================================
// Demo Functions
// ============================================================================

const runAsyncDemo = async (): Promise<void> => {
    console.log('=== Async Callbacks Demo ===\n');

    // Test retry mechanism
    console.log('1. Testing retry mechanism:');
    try {
        const result = await retryableApiCall();
        console.log('✅', result);
    } catch (error) {
        console.log('❌ All retries failed:', (error as Error).message);
    }

    console.log('\n2. Testing timeout wrapper:');
    try {
        const result = await timeoutApiCall();
        console.log('✅', result);
    } catch (error) {
        console.log('❌ Timeout error:', (error as Error).message);
    }

    console.log('\n3. Testing circuit breaker:');
    for (let i = 0; i < 6; i++) {
        try {
            const result = await circuitBreakerApiCall();
            console.log('✅', result);
        } catch (error) {
            console.log('❌ Circuit breaker error:', (error as Error).message);
        }
    }

    console.log('\n4. Testing async events:');
    await asyncEventEmitter.emit('data-loaded', {
        data: [1, 2, 3, 4, 5],
        timestamp: new Date()
    });

    await asyncEventEmitter.emit('error-occurred', {
        error: new Error('Sample error'),
        context: 'demo context'
    });

    console.log('\n5. Testing async pipeline:');
    try {
        const result = await dataPipeline.process({ name: 'test', value: 42 });
        console.log('✅ Pipeline result:', result);
    } catch (error) {
        console.log('❌ Pipeline error:', (error as Error).message);
    }

    console.log('\n6. Testing batch processing:');
    const users = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 },
        { name: 'Diana', age: 28 }
    ];

    const processedUsers = await processBatch(users, processUserData, 2, 2);
    console.log('✅ Processed users:', processedUsers.length);
};

// Export for use in other modules
export {
    retryAsync,
    withTimeout,
    circuitBreaker,
    AsyncEventEmitter,
    AsyncPipeline,
    processBatch,
    runAsyncDemo
};

// Uncomment to run the demo
// runAsyncDemo().catch(console.error);
