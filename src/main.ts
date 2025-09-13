import { UserController } from './userController';
import { BussinessService } from './bussinessService';
import { UserRepositoryService } from './userRepositoryService';

// Dependency Injection Example
console.log("=== User Management System with Dependency Injection ===\n");

// Create instances with proper dependency injection
const userRepositoryService = new UserRepositoryService();
const businessService = new BussinessService(userRepositoryService);
const userController = new UserController(businessService);

// Example usage
const userData = { id: 1, name: "John Doe", email: "john@example.com" };

console.log("Saving user data...");
const saveResult = userController.saveUserData(userData);
console.log("Save result:", saveResult);

console.log("\nRetrieving all users...");
const allUsers = userController.getAllUserData();
console.log("All users:", allUsers);

console.log("\n=== Dependency Injection Chain ===");
console.log("UserController -> BussinessService -> UserRepositoryService");
console.log("✓ All dependencies properly injected!");
