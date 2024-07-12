import { IUser } from '../../models/interfaces/IUser';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | undefined>;
  create(userData: IUser): Promise<IUser>;
  update(id: number, userData: IUser): Promise<IUser>;
  delete(id: number): Promise<void>;
}
