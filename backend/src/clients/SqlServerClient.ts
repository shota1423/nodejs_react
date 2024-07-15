import sql from "mssql";
import { IDatabaseClient } from "./interfaces/IDatabaseClient";

export class SqlServerClient implements IDatabaseClient {
  private pool: sql.ConnectionPool;

  constructor(config: any) {
    this.pool = new sql.ConnectionPool(config);
  }

  async connect(): Promise<void> {
    await this.pool.connect();
  }

  async close(): Promise<void> {
    await this.pool.close();
  }

  async query(query: string, params?: any[]): Promise<any> {
    const request = this.pool.request();
    params?.forEach((param, index) => {
      request.input(`param${index}`, param);
    });
    const result = await request.query(query);
    return result.recordset;
  }
}
