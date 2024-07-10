import userRepository from '../repositories/userRepository';
import { User } from '../models/userModel';

class UserService {
  async getAllUsers(): Promise<User[]> {
    return await userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await userRepository.findById(id);
  }

  async createUser(userData: User): Promise<User> {
    return await userRepository.create(userData);
  }

  async updateUser(id: number, userData: User): Promise<User> {
    return await userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    await userRepository.delete(id);
  }
}

export default new UserService();
