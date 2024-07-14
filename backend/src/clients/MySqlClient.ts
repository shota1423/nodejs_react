// clients/MySqlClient.ts
import mysql, { Pool } from "mysql2/promise";
import { IDatabaseClient } from "./interfaces/IDatabaseClient";

export class MySqlClient implements IDatabaseClient {
  private pool: Pool;

  constructor(config: any) {
    this.pool = mysql.createPool(config);
  }

  async connect(): Promise<void> {
    await this.pool.getConnection();
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async query(query: string, params?: any[]): Promise<any> {
    const [rows] = await this.pool.execute(query, params);
    return rows;
  }
}
