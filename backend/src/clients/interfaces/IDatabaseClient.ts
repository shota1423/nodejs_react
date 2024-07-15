export interface IDatabaseClient {
  connect(): Promise<void>;
  close(): Promise<void>;
  query(query: string, params?: any[]): Promise<any>;
}
