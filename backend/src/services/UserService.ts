import { IUserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/User';
import { User } from '../models/User';
import UserRepository from '../repositories/UserRepository';

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: number): Promise<IUser | undefined>;
  createUser(userData: { name: string; email: string; password: string }): Promise<IUser>;
  updateUser(id: number, userData: { name: string; email: string; password: string }): Promise<IUser>;
  deleteUser(id: number): Promise<void>;
}

class UserService implements IUserService {
  private _userRepository: IUserRepository; 
  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }
  
  async getAllUsers(): Promise<IUser[]> {
    return await this._userRepository.findAll();
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    return await this._userRepository.findById(id);
  }

  async createUser(userData: { name: string; email: string; password: string }): Promise<IUser> {
    const user = new User(userData.name, userData.email, userData.password);
    return await this._userRepository.create(user);
  }

  async updateUser(id: number, userData: { name: string; email: string; password: string }): Promise<IUser> {
    const user = new User(userData.name, userData.email, userData.password, id);
    return await this._userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return await this._userRepository.delete(id);
  }
}


export default new UserService(UserRepository);
