// repositories/UserRepository.ts
import { poolPromise } from "../config/database";
import { IUser } from "../models/interfaces/IUser";
import { User } from "../models/User";
import { IUserRepository } from "./interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  findAll = async (): Promise<IUser[]> => {
    const pool = await poolPromise;
    const result = await pool.query("SELECT * FROM users");
    return result.map(
      (row: any) => new User(row.name, row.email, row.password, row.id)
    );
  };

  findById = async (id: number): Promise<IUser | undefined> => {
    const pool = await poolPromise;
    const result = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    const row = result[0];
    if (row) {
      return new User(row.name, row.email, row.password, row.id);
    }
    return undefined;
  };

  create = async (user: IUser): Promise<IUser> => {
    const pool = await poolPromise;
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return new User(user.name, user.email, user.password, result.insertId);
  };

  update = async (id: number, user: IUser): Promise<IUser> => {
    const pool = await poolPromise;
    await pool.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [user.name, user.email, user.password, id]
    );
    return new User(user.name, user.email, user.password, id);
  };

  async delete(id: number): Promise<void> {
    const pool = await poolPromise;
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
  }
}

export default new UserRepository();
