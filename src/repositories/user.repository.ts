
// import { IUser } from 'interfaces/Iuser.interface';
// import User from 'schemas/user.schema';
// import userModel from 'schemas/user.schema';

// const userRepository = {
//   getAll: async function () {
//     return await userModel.find();
//   },

//   getUserByUsernameAndPassword: async function (username: string, password: string): Promise<User | undefined> {
//     return (await this.getAll()).find((user) => user.getUserName() === username && user.getPassword() === password);
//   },

//   getUserById: async function (userId: string) {
//     return (await this.getAll()).find((user) => user.getUserId() === userId);
//   },

//   existsUserWithUserName: async function (userName: string) {
//     return (await this.getAll()).some((user) => user.getUserName() === userName);
//   },
//   save: function(user: IUser): void{
//     const userr = new User(user);
//     userr.save();
    
//   } 
// };

// export default userRepository;
