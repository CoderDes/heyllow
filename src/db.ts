import { Sequelize } from "sequelize";

const user: string | undefined = process.env.ELEPHANT_SQL_USER;
const pass: string | undefined = process.env.ELEPHANT_SQL_PASS;
const dbName: string | undefined = user;

if (!user || !pass || !dbName) {
  throw new Error("Credentials for database are undefined");
}

const db = new Sequelize(
  `postgres://${user}:${pass}@lallah.db.elephantsql.com:5432/${dbName}`,
);

export default db;
