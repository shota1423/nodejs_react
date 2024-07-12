import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IUser } from '../models/interfaces/IUser';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { IUserService } from './interfaces/IUserService';

export class UserService implements IUserService {
  private userRepository: IUserRepository; 
  constructor() {
    this.userRepository = new UserRepository();
  }

  
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
