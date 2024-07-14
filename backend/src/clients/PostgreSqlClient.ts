// clients/PostgreSqlClient.ts
import { Pool } from "pg";
import { IDatabaseClient } from "./interfaces/IDatabaseClient";

export class PostgreSqlClient implements IDatabaseClient {
  private pool: Pool;

  constructor(config: any) {
    this.pool = new Pool(config);
  }

  async connect(): Promise<void> {
    await this.pool.connect();
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async query(query: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
