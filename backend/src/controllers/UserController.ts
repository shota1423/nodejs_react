import { Request, Response } from 'express';
import { IUserService } from '../services/UserService';
import UserService from '../services/UserService';


class UserController {
  private _userService: IUserService;
  constructor(userService: IUserService) {
    this._userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this._userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await this._userService.getUserById(parseInt(req.params.id, 10));
    res.json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await this._userService.createUser(req.body);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await this._userService.updateUser(parseInt(req.params.id, 10), req.body);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this._userService.deleteUser(parseInt(req.params.id, 10));
    res.status(204).end();
  }
}

export default new UserController(UserService);
