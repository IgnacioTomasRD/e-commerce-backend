import { User } from 'users/User';

const userRepository = {
  getAll: function (): User[] {
    return [
      new User('nachito', '1234', 'nacho', 'RD'),
      new User('felipe', '12345', 'felipe', 'RD')
    ];
  },

  getUserByUsernameAndPassword: function (username: string, password: string): User | undefined {
    return this.getAll().find((user) => user.getUserName() === username && user.getPassword() === password);
  },

  getUserById(userId: string) {
    return this.getAll().find(user => user.getUserId() === userId);
  }

};

export default userRepository;
