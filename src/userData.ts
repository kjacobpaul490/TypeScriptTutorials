
interface User {
    id: number;
    name: string;
    email: string;
  }
  
  class UserService {
    private users: User[] = [];
  
    addUser(user: User): void {
      this.users.push(user);
      console.log(`User ${user.name} added successfully!`);
    }
  
    getUsers(): User[] {
      return [...this.users];
    }
  
    getUserById(id: number): User | undefined {
      return this.users.find(user => user.id === id);
    }
  }
  
  function main(): void {
    console.log('🚀 TypeScript Boilerplate Project Started!');
    
    const userService = new UserService();
    
    // Add some sample users
    userService.addUser({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
    
    userService.addUser({
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
    });
    
    // Display all users
    console.log('\n📋 All Users:');
    const users = userService.getUsers();
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
    
    // Find a specific user
    const user = userService.getUserById(1);
    if (user) {
      console.log(`\n🔍 Found user: ${user.name}`);
    }
    
    console.log('\n✅ Application completed successfully!');
  }