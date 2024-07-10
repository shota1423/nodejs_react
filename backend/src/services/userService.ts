import { IUserRepository } from '../repositories/userRepository';
import { IUser } from '../models/user';
import { User } from '../models/user';
import UserRepository from '../repositories/userRepository';

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: number): Promise<IUser | undefined>;
  createUser(userData: { name: string; email: string; password: string }): Promise<IUser>;
  updateUser(id: number, userData: { name: string; email: string; password: string }): Promise<IUser>;
  deleteUser(id: number): Promise<void>;
}

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  
  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    return await this.userRepository.findById(id);
  }

  async createUser(userData: { name: string; email: string; password: string }): Promise<IUser> {
    const user = new User(userData.name, userData.email, userData.password);
    return await this.userRepository.create(user);
  }

  async updateUser(id: number, userData: { name: string; email: string; password: string }): Promise<IUser> {
    const user = new User(userData.name, userData.email, userData.password, id);
    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return await this.userRepository.delete(id);
  }
}


export default new UserService(UserRepository);
