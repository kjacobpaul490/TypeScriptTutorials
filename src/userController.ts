

// Mock localStorage for Node.js environment
const localStorage = {
    storage: new Map<string, string>(),
    setItem(key: string, value: string): void {
        this.storage.set(key, value);
    },
    getItem(key: string): string | null {
        return this.storage.get(key) || null;
    },
    removeItem(key: string): void {
        this.storage.delete(key);
    },
    clear(): void {
        this.storage.clear();
    }
};

class UserController {
    private userBusinessService: IUserBussinessService;

    constructor(userBusinessService: IUserBussinessService) {
        this.userBusinessService = userBusinessService;
    }

    // Method to demonstrate dependency injection usage
    saveUserData(userDetails: any): boolean {
        return this.userBusinessService.saveUser(userDetails);
    }

    getAllUserData(): any {
        return this.userBusinessService.getAllUsers();
    }
}

interface IUserBussinessService {

    getAllUsers(): any;

    saveUser(userDetails: any): boolean;


}

class BussinessService implements IUserBussinessService {

    private userRepository: IUserRepositoryService;

    constructor(userRepository: IUserRepositoryService) {
        this.userRepository = userRepository;
    }



    // Additional methods for dependency injection usage
    saveUser(userDetails: any): boolean {
        return this.userRepository.saveUser(userDetails);
    }

    getAllUsers(): any {
        return this.userRepository.getAllUsers();
    }
}




interface IUserRepositoryService {

    getAllUsers(): any;

    saveUser(userDetails: any): boolean;


}

class UserRepositoryService implements IUserRepositoryService {

    getAllUsers(): any {
        return localStorage.getItem("LSuserDetails");

    }
    saveUser(userDetails: any): boolean {
        try {
            localStorage.setItem("LSuserDetails", JSON.stringify(userDetails));
            return true

        }
        catch (ex) {

            return false
        }
    }

}

// Dependency Injection Example
// Create instances
const userRepositoryService = new UserRepositoryService();
const businessService = new BussinessService(userRepositoryService);
const userController = new UserController(businessService);

// Example usage
const userData = { id: 1, name: "John Doe", email: "john@example.com" };

// Save user data using dependency injection
const saveResult = userController.saveUserData(userData);
console.log("Save result:", saveResult);

// Get all users using dependency injection
const allUsers = userController.getAllUserData();
console.log("All users:", allUsers);
