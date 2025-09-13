import { IUserRepositoryService } from './interfaces';

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

export class UserRepositoryService implements IUserRepositoryService {
    getAllUsers(): any {
        return localStorage.getItem("LSuserDetails");
    }

    saveUser(userDetails: any): boolean {
        try {
            localStorage.setItem("LSuserDetails", JSON.stringify(userDetails));
            return true;
        }
        catch (ex) {
            return false;
        }
    }
}
