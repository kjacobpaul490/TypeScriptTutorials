// Practical Examples of Higher-Order Functions & Callbacks
// User Management System with TypeScript

// ============================================================================
// Type Definitions
// ============================================================================

interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    lastLogin?: Date;
}

// Callback types for different operations
type UserCallback = (user: User) => void;
type UserValidationCallback = (user: User) => boolean;
type UserTransformCallback = (user: User) => User;
type UserFilterCallback = (user: User) => boolean;

// ============================================================================
// User Service with Higher-Order Functions
// ============================================================================

class UserService {
    private users: User[] = [];
    private eventCallbacks: Map<string, UserCallback[]> = new Map();

    // Add user with validation callback
    addUser(user: User, validationCallback?: UserValidationCallback): boolean {
        if (validationCallback && !validationCallback(user)) {
            console.log(`User ${user.name} failed validation`);
            return false;
        }

        this.users.push(user);
        this.notifyEvent('user-added', user);
        return true;
    }

    // Get users with filter callback
    getUsers(filterCallback?: UserFilterCallback): User[] {
        if (!filterCallback) {
            return [...this.users];
        }
        return this.users.filter(filterCallback);
    }

    // Update user with transform callback
    updateUser(userId: string, transformCallback: UserTransformCallback): boolean {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return false;
        }

        const user = this.users[userIndex];
        if (user) {
            this.users[userIndex] = transformCallback(user);
            this.notifyEvent('user-updated', this.users[userIndex]);
        }
        return true;
    }

    // Delete user with confirmation callback
    deleteUser(userId: string, confirmationCallback?: (user: User) => boolean): boolean {
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return false;
        }

        const user = this.users[userIndex];
        if (user) {
            if (confirmationCallback && !confirmationCallback(user)) {
                console.log(`Deletion of user ${user.name} was cancelled`);
                return false;
            }

            this.users.splice(userIndex, 1);
            this.notifyEvent('user-deleted', user);
        }
        return true;
    }

    // Process users with callback
    processUsers(processCallback: UserCallback): void {
        this.users.forEach(processCallback);
    }

    // Event system
    onUserEvent(event: string, callback: UserCallback): void {
        if (!this.eventCallbacks.has(event)) {
            this.eventCallbacks.set(event, []);
        }
        this.eventCallbacks.get(event)!.push(callback);
    }

    private notifyEvent(event: string, user: User): void {
        const callbacks = this.eventCallbacks.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                if (user) {
                    callback(user);
                }
            });
        }
    }
}

// ============================================================================
// Higher-Order Functions for User Operations
// ============================================================================

// Create filter functions
const createAgeFilter = (minAge: number, maxAge: number): UserFilterCallback => {
    return (user: User) => user.age >= minAge && user.age <= maxAge;
};

const createActiveFilter = (): UserFilterCallback => {
    return (user: User) => user.isActive;
};

const createSearchFilter = (searchTerm: string): UserFilterCallback => {
    const term = searchTerm.toLowerCase();
    return (user: User) => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term);
};

// Create validation functions
const createEmailValidation = (): UserValidationCallback => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (user: User) => emailRegex.test(user.email);
};

const createAgeValidation = (minAge: number = 13, maxAge: number = 120): UserValidationCallback => {
    return (user: User) => user.age >= minAge && user.age <= maxAge;
};

// Create transform functions
const createLastLoginUpdater = (): UserTransformCallback => {
    return (user: User) => ({
        ...user,
        lastLogin: new Date()
    });
};

const createNameFormatter = (): UserTransformCallback => {
    return (user: User) => ({
        ...user,
        name: user.name.trim().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
    });
};

// ============================================================================
// Advanced Higher-Order Functions
// ============================================================================

// Function that creates a memoized version of a callback
const memoize = <T extends (...args: any[]) => any>(
    fn: T,
    keyGenerator?: (...args: Parameters<T>) => string
): T => {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>) => {
        const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit for key:', key);
            return cache.get(key)!;
        }
        
        const result = fn(...args);
        cache.set(key, result);
        console.log('Cache miss, computed result for key:', key);
        return result;
    }) as T;
};

// Function that creates a rate-limited version of a callback
const rateLimit = <T extends (...args: any[]) => any>(
    fn: T,
    maxCalls: number,
    timeWindow: number
): T => {
    const calls: number[] = [];
    
    return ((...args: Parameters<T>) => {
        const now = Date.now();
        
        // Remove calls outside the time window
        while (calls.length > 0 && calls[0]! <= now - timeWindow) {
            calls.shift();
        }
        
        if (calls.length >= maxCalls) {
            console.log('Rate limit exceeded, skipping call');
            return;
        }
        
        calls.push(now);
        return fn(...args);
    }) as T;
};

// ============================================================================
// Usage Examples
// ============================================================================

// Initialize user service
const userService = new UserService();

// Add event listeners
userService.onUserEvent('user-added', (user) => {
    console.log(`🎉 New user added: ${user.name} (${user.email})`);
});

userService.onUserEvent('user-updated', (user) => {
    console.log(`📝 User updated: ${user.name}`);
});

userService.onUserEvent('user-deleted', (user) => {
    console.log(`🗑️ User deleted: ${user.name}`);
});

// Create sample users
const sampleUsers: User[] = [
    {
        id: '1',
        name: 'john doe',
        email: 'john@example.com',
        age: 25,
        isActive: true
    },
    {
        id: '2',
        name: 'jane smith',
        email: 'jane@example.com',
        age: 30,
        isActive: true
    },
    {
        id: '3',
        name: 'bob wilson',
        email: 'bob@example.com',
        age: 45,
        isActive: false
    }
];

// Add users with validation
const emailValidator = createEmailValidation();
const ageValidator = createAgeValidation(18, 65);

sampleUsers.forEach(user => {
    const combinedValidator = (u: User) => emailValidator(u) && ageValidator(u);
    userService.addUser(user, combinedValidator);
});

console.log('\n=== User Operations ===');

// Get active users
const activeUsers = userService.getUsers(createActiveFilter());
console.log('Active users:', activeUsers.map(u => u.name));

// Get users in age range
const youngUsers = userService.getUsers(createAgeFilter(20, 35));
console.log('Users aged 20-35:', youngUsers.map(u => u.name));

// Search users
const searchResults = userService.getUsers(createSearchFilter('jane'));
console.log('Search results for "jane":', searchResults.map(u => u.name));

// Update user with transform
userService.updateUser('1', createNameFormatter());
userService.updateUser('1', createLastLoginUpdater());

// Process all users
console.log('\n=== Processing Users ===');
userService.processUsers((user) => {
    console.log(`Processing: ${user.name} (${user.email})`);
});

// Demonstrate memoization
const expensiveCalculation = memoize((n: number) => {
    console.log(`Computing expensive calculation for ${n}`);
    return n * n * n;
});

console.log('\n=== Memoization Demo ===');
console.log('Result 1:', expensiveCalculation(5));
console.log('Result 2:', expensiveCalculation(5)); // Should use cache
console.log('Result 3:', expensiveCalculation(3));

// Demonstrate rate limiting
const rateLimitedLog = rateLimit((message: string) => {
    console.log(`Rate limited: ${message}`);
}, 2, 1000); // Max 2 calls per second

console.log('\n=== Rate Limiting Demo ===');
rateLimitedLog('Message 1');
rateLimitedLog('Message 2');
rateLimitedLog('Message 3'); // Should be skipped
setTimeout(() => rateLimitedLog('Message 4'), 1100); // Should work after delay

// Demonstrate function composition
const processUser = (user: User) => {
    console.log(`Processing user: ${user.name}`);
    return user;
};

const logUser = (user: User) => {
    console.log(`Logging user: ${user.name}`);
    return user;
};

const notifyUser = (user: User) => {
    console.log(`Notifying user: ${user.name}`);
    return user;
};

// Compose functions
const userPipeline = [processUser, logUser, notifyUser];
const processUserPipeline = (user: User) => {
    return userPipeline.reduce((acc, fn) => fn(acc), user);
};

console.log('\n=== Function Composition Demo ===');
const testUser: User = {
    id: '4',
    name: 'alice brown',
    email: 'alice@example.com',
    age: 28,
    isActive: true
};

processUserPipeline(testUser);

export {
    UserService,
    createAgeFilter,
    createActiveFilter,
    createSearchFilter,
    createEmailValidation,
    createAgeValidation,
    createLastLoginUpdater,
    createNameFormatter,
    memoize,
    rateLimit
};
