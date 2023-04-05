/* eslint-disable @typescript-eslint/prefer-readonly */
export class User {
  private id!: string;
  private userName: string;
  private password: string;
  private firstName: string;
  private lastName: string;

  constructor(userName: string, password: string, firstName: string, lastName: string) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getUserName(): string {
    return this.userName;
  }

  getPassword(): string {
    return this.password;
  }

  getId(): string {
    return this.id;
  }
}
