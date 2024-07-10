import { Request, Response } from 'express';
import { IUserService } from '../services/userService';
import UserService from '../services/userService';


class UserController {
  constructor(private userService: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getUserById(parseInt(req.params.id, 10));
    res.json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.updateUser(parseInt(req.params.id, 10), req.body);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.deleteUser(parseInt(req.params.id, 10));
    res.status(204).end();
  }
}

export default new UserController(UserService);
