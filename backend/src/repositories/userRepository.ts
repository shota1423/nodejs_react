import { sql, poolPromise } from '../config/database';
import { IUser } from '../models/User';
import { User } from '../models/User';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | undefined>;
  create(userData: IUser): Promise<IUser>;
  update(id: number, userData: IUser): Promise<IUser>;
  delete(id: number): Promise<void>;
}

class UserRepository implements IUserRepository {
  async findAll(): Promise<IUser[]> {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset.map(row => new User(row.name, row.email, row.password, row.id));
  }

  async findById(id: number): Promise<IUser | undefined> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Users WHERE id = @id');
    const row = result.recordset[0];
    if (row) {
      return new User(row.name, row.email, row.password, row.id);
    }
    return undefined;
  }

  async create(user: IUser): Promise<IUser> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar, user.name)
      .input('email', sql.NVarChar, user.email)
      .input('password', sql.NVarChar, user.password)
      .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password); SELECT SCOPE_IDENTITY() AS id;');
    return new User(user.name, user.email, user.password, result.recordset[0].id);
  }

  async update(id: number, user: IUser): Promise<IUser> {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, user.name)
      .input('email', sql.NVarChar, user.email)
      .input('password', sql.NVarChar, user.password)
      .query('UPDATE Users SET name = @name, email = @email, password = @password WHERE id = @id');
    return new User(user.name, user.email, user.password, id);
  }

  async delete(id: number): Promise<void> {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE id = @id');
  }
}

export default new UserRepository();
