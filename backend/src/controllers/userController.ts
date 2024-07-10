import { Request, Response } from 'express';
import userService from '../services/userService';

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await userService.getUserById(parseInt(req.params.id, 10));
    res.json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await userService.updateUser(parseInt(req.params.id, 10), req.body);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await userService.deleteUser(parseInt(req.params.id, 10));
    res.status(204).end();
  }
}

export default new UserController();
