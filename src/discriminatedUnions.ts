/**
 * TypeScript Discriminated Unions Examples
 * 
 * Discriminated unions (also called tagged unions) are a pattern where each
 * member of a union type has a common property (the discriminant) that can
 * be used to distinguish between the different types.
 */

// ==========================================
// 1. Basic Discriminated Union
// ==========================================

type LoadingState = {
    status: "loading";
    progress: number;
};

type SuccessState = {
    status: "success";
    data: string;
};

type ErrorState = {
    status: "error";
    error: string;
};

type AppState = LoadingState | SuccessState | ErrorState;

function handleAppState(state: AppState) {
    // TypeScript can narrow the type based on the discriminant property
    switch (state.status) {
        case "loading":
            // TypeScript knows this is LoadingState
            console.log(`Loading... ${state.progress}%`);
            break;
        case "success":
            // TypeScript knows this is SuccessState
            console.log(`Success! Data: ${state.data}`);
            break;
        case "error":
            // TypeScript knows this is ErrorState
            console.log(`Error: ${state.error}`);
            break;
    }
}

console.log("=== Basic Discriminated Union ===");
handleAppState({ status: "loading", progress: 50 });
handleAppState({ status: "success", data: "Hello World" });
handleAppState({ status: "error", error: "Something went wrong" });

// ==========================================
// 2. Shape-based Discriminated Union
// ==========================================

type Circle = {
    kind: "circle";
    radius: number;
};

type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
};

type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
};

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius * shape.radius;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
    }
}

function describeShape(shape: Shape): string {
    switch (shape.kind) {
        case "circle":
            return `Circle with radius ${shape.radius}`;
        case "rectangle":
            return `Rectangle ${shape.width}x${shape.height}`;
        case "triangle":
            return `Triangle with base ${shape.base} and height ${shape.height}`;
    }
}

// Example usage
console.log("\n=== Shape-based Discriminated Union ===");
const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 10, height: 8 };
const triangle: Shape = { kind: "triangle", base: 6, height: 4 };

console.log(`${describeShape(circle)} - Area: ${calculateArea(circle).toFixed(2)}`);
console.log(`${describeShape(rectangle)} - Area: ${calculateArea(rectangle)}`);
console.log(`${describeShape(triangle)} - Area: ${calculateArea(triangle)}`);

// ==========================================
// 3. API Response Discriminated Union
// ==========================================

type ApiLoadingResponse = {
    type: "loading";
    timestamp: number;
};

type ApiSuccessResponse<T> = {
    type: "success";
    data: T;
    timestamp: number;
    statusCode: number;
};

type ApiErrorResponse = {
    type: "error";
    error: string;
    timestamp: number;
    statusCode: number;
};

type ApiResponse<T> = ApiLoadingResponse | ApiSuccessResponse<T> | ApiErrorResponse;

interface User {
    id: number;
    name: string;
    email: string;
}

function handleApiResponse<T>(response: ApiResponse<T>) {
    switch (response.type) {
        case "loading":
            console.log(`Loading since ${new Date(response.timestamp).toLocaleTimeString()}`);
            break;
        case "success":
            console.log(`Success (${response.statusCode}): ${JSON.stringify(response.data)}`);
            break;
        case "error":
            console.log(`Error (${response.statusCode}): ${response.error}`);
            break;
    }
}

// Example usage
console.log("\n=== API Response Discriminated Union ===");
const loadingResponse: ApiResponse<User> = {
    type: "loading",
    timestamp: Date.now()
};

const successResponse: ApiResponse<User> = {
    type: "success",
    data: { id: 1, name: "John Doe", email: "john@example.com" },
    timestamp: Date.now(),
    statusCode: 200
};

const errorResponse: ApiResponse<User> = {
    type: "error",
    error: "User not found",
    timestamp: Date.now(),
    statusCode: 404
};

handleApiResponse(loadingResponse);
handleApiResponse(successResponse);
handleApiResponse(errorResponse);

// ==========================================
// 4. Event System Discriminated Union
// ==========================================

type ClickEvent = {
    eventType: "click";
    target: string;
    x: number;
    y: number;
};

type KeyPressEvent = {
    eventType: "keypress";
    key: string;
    code: string;
    ctrlKey: boolean;
};

type ScrollEvent = {
    eventType: "scroll";
    direction: "up" | "down";
    position: number;
};

type CustomEvent = {
    eventType: "custom";
    name: string;
    data: any;
};

type AppEvent = ClickEvent | KeyPressEvent | ScrollEvent | CustomEvent;

function handleEvent(event: AppEvent) {
    switch (event.eventType) {
        case "click":
            console.log(`Click on ${event.target} at (${event.x}, ${event.y})`);
            break;
        case "keypress":
            console.log(`Key pressed: ${event.key} (${event.code})${event.ctrlKey ? ' + Ctrl' : ''}`);
            break;
        case "scroll":
            console.log(`Scrolled ${event.direction} to position ${event.position}`);
            break;
        case "custom":
            console.log(`Custom event: ${event.name} with data: ${JSON.stringify(event.data)}`);
            break;
    }
}

// Example usage
console.log("\n=== Event System Discriminated Union ===");
const clickEvent: AppEvent = {
    eventType: "click",
    target: "button",
    x: 100,
    y: 200
};

const keyEvent: AppEvent = {
    eventType: "keypress",
    key: "Enter",
    code: "Enter",
    ctrlKey: true
};

const scrollEvent: AppEvent = {
    eventType: "scroll",
    direction: "down",
    position: 150
};

const customEvent: AppEvent = {
    eventType: "custom",
    name: "userAction",
    data: { action: "save", timestamp: Date.now() }
};

handleEvent(clickEvent);
handleEvent(keyEvent);
handleEvent(scrollEvent);
handleEvent(customEvent);

// ==========================================
// 5. Form Validation Discriminated Union
// ==========================================

type ValidField = {
    state: "valid";
    value: string;
    validationMessage?: string;
};

type InvalidField = {
    state: "invalid";
    value: string;
    validationMessage: string;
};

type PendingField = {
    state: "pending";
    value: string;
};

type FieldState = ValidField | InvalidField | PendingField;

function validateField(field: FieldState): FieldState {
    if (field.state === "pending") {
        // Simulate validation
        if (field.value.length < 3) {
            return {
                state: "invalid",
                value: field.value,
                validationMessage: "Value must be at least 3 characters"
            };
        } else {
            return {
                state: "valid",
                value: field.value,
                validationMessage: "Field is valid"
            };
        }
    }
    return field;
}

function displayFieldState(field: FieldState) {
    switch (field.state) {
        case "valid":
            console.log(`✓ Valid: ${field.value}${field.validationMessage ? ` - ${field.validationMessage}` : ''}`);
            break;
        case "invalid":
            console.log(`✗ Invalid: ${field.value} - ${field.validationMessage}`);
            break;
        case "pending":
            console.log(`⏳ Pending: ${field.value}`);
            break;
    }
}

// Example usage
console.log("\n=== Form Validation Discriminated Union ===");
const pendingField: FieldState = { state: "pending", value: "ab" };
const validField: FieldState = { state: "valid", value: "hello" };
const invalidField: FieldState = {
    state: "invalid",
    value: "",
    validationMessage: "This field is required"
};

displayFieldState(pendingField);
displayFieldState(validField);
displayFieldState(invalidField);

const validatedField = validateField(pendingField);
displayFieldState(validatedField);

// ==========================================
// 6. State Machine Discriminated Union
// ==========================================

type IdleState = {
    state: "idle";
    message: string;
};

type RunningState = {
    state: "running";
    startTime: number;
    progress: number;
};

type PausedState = {
    state: "paused";
    startTime: number;
    pauseTime: number;
    progress: number;
};

type CompletedState = {
    state: "completed";
    startTime: number;
    endTime: number;
    result: any;
};

type TaskState = IdleState | RunningState | PausedState | CompletedState;

function processTaskState(taskState: TaskState) {
    switch (taskState.state) {
        case "idle":
            console.log(`Task is idle: ${taskState.message}`);
            break;
        case "running":
            const runningTime = Date.now() - taskState.startTime;
            console.log(`Task is running for ${runningTime}ms, progress: ${taskState.progress}%`);
            break;
        case "paused":
            const pausedTime = Date.now() - taskState.pauseTime;
            console.log(`Task is paused for ${pausedTime}ms, progress: ${taskState.progress}%`);
            break;
        case "completed":
            const totalTime = taskState.endTime - taskState.startTime;
            console.log(`Task completed in ${totalTime}ms. Result: ${JSON.stringify(taskState.result)}`);
            break;
    }
}

// Example usage
console.log("\n=== State Machine Discriminated Union ===");
const idleTask: TaskState = { state: "idle", message: "Ready to start" };
const runningTask: TaskState = { state: "running", startTime: Date.now() - 5000, progress: 75 };
const pausedTask: TaskState = { state: "paused", startTime: Date.now() - 10000, pauseTime: Date.now() - 2000, progress: 50 };
const completedTask: TaskState = { state: "completed", startTime: Date.now() - 15000, endTime: Date.now() - 5000, result: { success: true } };

processTaskState(idleTask);
processTaskState(runningTask);
processTaskState(pausedTask);
processTaskState(completedTask);

// ==========================================
// 7. Nested Discriminated Union
// ==========================================

type SuccessResult<T> = {
    status: "success";
    data: T;
};

type ErrorResult = {
    status: "error";
    error: {
        type: "validation" | "network" | "server";
        message: string;
        code: number;
    };
};

type LoadingResult = {
    status: "loading";
    progress: number;
};

type ApiResult<T> = SuccessResult<T> | ErrorResult | LoadingResult;

function handleApiResult<T>(result: ApiResult<T>) {
    switch (result.status) {
        case "success":
            console.log(`Success: ${JSON.stringify(result.data)}`);
            break;
        case "error":
            console.log(`Error (${result.error.type}): ${result.error.message} (Code: ${result.error.code})`);
            break;
        case "loading":
            console.log(`Loading... ${result.progress}%`);
            break;
    }
}

// Example usage
console.log("\n=== Nested Discriminated Union ===");
const successResult: ApiResult<User> = {
    status: "success",
    data: { id: 1, name: "Jane Doe", email: "jane@example.com" }
};

const validationError: ApiResult<User> = {
    status: "error",
    error: {
        type: "validation",
        message: "Email format is invalid",
        code: 400
    }
};

const networkError: ApiResult<User> = {
    status: "error",
    error: {
        type: "network",
        message: "Connection timeout",
        code: 408
    }
};

const loadingResult: ApiResult<User> = {
    status: "loading",
    progress: 60
};

handleApiResult(successResult);
handleApiResult(validationError);
handleApiResult(networkError);
handleApiResult(loadingResult);

export {
    handleAppState,
    calculateArea,
    describeShape,
    handleApiResponse,
    handleEvent,
    validateField,
    displayFieldState,
    processTaskState,
    handleApiResult
};
