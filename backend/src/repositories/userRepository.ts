import { sql, poolPromise } from '../config/database';
import { User } from '../models/userModel';

class UserRepository {
  async findAll(): Promise<User[]> {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
  }

  async findById(id: number): Promise<User | undefined> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Users WHERE id = @id');
    return result.recordset[0];
  }

  async create(userData: User): Promise<User> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar, userData.name)
      .input('email', sql.NVarChar, userData.email)
      .input('password', sql.NVarChar, userData.password)
      .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password); SELECT SCOPE_IDENTITY() AS id;');
    return { id: result.recordset[0].id, ...userData };
  }

  async update(id: number, userData: User): Promise<User> {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, userData.name)
      .input('email', sql.NVarChar, userData.email)
      .input('password', sql.NVarChar, userData.password)
      .query('UPDATE Users SET name = @name, email = @email, password = @password WHERE id = @id');
    return { id, ...userData };
  }

  async delete(id: number): Promise<void> {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE id = @id');
  }
}

export default new UserRepository();
