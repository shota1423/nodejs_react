import { config } from "dotenv";
import { MySqlClient } from "../clients/MySqlClient";
import { SqlServerClient } from "../clients/SqlServerClient";
import { PostgreSqlClient } from "../clients/PostgreSqlClient";
import { IDatabaseClient } from "../clients/interfaces/IDatabaseClient";

config();

let dbClient: IDatabaseClient;

const dbType = process.env.DB_TYPE;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbPort = Number(process.env.DB_PORT);

if (!dbType || !dbHost || !dbUser || !dbPassword || !dbDatabase) {
  throw new Error("Required environment variables are not set");
}

if (dbType === "mysql") {
  dbClient = new MySqlClient({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
    port: dbPort || 3306,
  });
} else if (dbType === "sqlserver") {
  dbClient = new SqlServerClient({
    user: dbUser,
    password: dbPassword,
    server: dbHost,
    database: dbDatabase,
    port: dbPort || 1433,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  });
} else if (dbType === "postgresql") {
  dbClient = new PostgreSqlClient({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
    port: dbPort || 5432,
  });
} else {
  throw new Error("Unsupported DB_TYPE");
}

if (dbType) {
  console.log(`${dbType} To Connected`);
}

const poolPromise = dbClient
  .connect()
  .then(() => dbClient)
  .catch((err) => {
    console.error("Database connection failed: ", err);
    throw err;
  });

export { poolPromise };
