import { IUser } from '../../models/interfaces/IUser';

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: number): Promise<IUser | undefined>;
  createUser(userData: { name: string; email: string; password: string }): Promise<IUser>;
  updateUser(id: number, userData: { name: string; email: string; password: string }): Promise<IUser>;
  deleteUser(id: number): Promise<void>;
}
