import { IUserBussinessService, IUserRepositoryService } from './interfaces';

export class BussinessService implements IUserBussinessService {
    private userRepository: IUserRepositoryService;

    constructor(userRepository: IUserRepositoryService) {
        this.userRepository = userRepository;
    }

    // Required by IUserBussinessService interface
    getAllUsers(): any {
        return this.userRepository.getAllUsers();
    }

    saveUser(userDetails: any): boolean {
        return this.userRepository.saveUser(userDetails);
    }
}
