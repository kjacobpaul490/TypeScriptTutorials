import { IUserBussinessService } from './interfaces';

export class UserController {
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