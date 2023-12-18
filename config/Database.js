import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const dbDialect = process.env.DB_DIALECT;
const dbUser = 'root';
const dbPass = process.env.DB_ROOT_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUrl = `${dbDialect}://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const db = new Sequelize(dbUrl, {
    logging: true
});

export default db;
