import { sql, poolPromise } from '../config/database';
import { IUser } from '../models/interfaces/IUser';
import { User } from '../models/User';
import { IUserRepository } from './interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  findAll = async (): Promise<IUser[]> => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset.map(row => new User(row.name, row.email, row.password, row.id));
  }

  findById = async (id: number): Promise<IUser | undefined> => {
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

  create = async (user: IUser): Promise<IUser> => {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar, user.name)
      .input('email', sql.NVarChar, user.email)
      .input('password', sql.NVarChar, user.password)
      .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password); SELECT SCOPE_IDENTITY() AS id;');
    return new User(user.name, user.email, user.password, result.recordset[0].id);
  }

  update = async (id: number, user: IUser): Promise<IUser> => {
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