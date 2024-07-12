import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IUser } from '../models/interfaces/IUser';
import { User } from '../models/User';
import UserRepository from '../repositories/UserRepository';
import { IUserService } from './interfaces/IUserService';

class UserService implements IUserService {
  private userRepository: IUserRepository; 
  constructor() {
    this.userRepository = UserRepository;
  }


  getAllUsers = async (): Promise<IUser[]> => {
    return await this.userRepository.findAll();
  }

  getUserById = async (id: number): Promise<IUser | undefined> => {
    return await this.userRepository.findById(id);
  }

  createUser = async (userData: { name: string; email: string; password: string }): Promise<IUser> => {
    const user = new User(userData.name, userData.email, userData.password);
    return await this.userRepository.create(user);
  }

  updateUser = async (id: number, userData: { name: string; email: string; password: string }): Promise<IUser> => {
    const user = new User(userData.name, userData.email, userData.password, id);
    return await this.userRepository.update(id, user);
  }

  deleteUser = async (id: number): Promise<void> => {
    return await this.userRepository.delete(id);
  }
}

export default new UserService();