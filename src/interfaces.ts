// Interface definitions for User Management System

export interface IUserBussinessService {
    getAllUsers(): any;
    saveUser(userDetails: any): boolean;
}

export interface IUserRepositoryService {
    getAllUsers(): any;
    saveUser(userDetails: any): boolean;
}
