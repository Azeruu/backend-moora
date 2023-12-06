import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const dbName  = process.env.DB_NAME || "ppdb";
const dbHost  = process.env.DB_HOST || "localhost";
const dbDialect  = process.env.DB_DIALECT || "mysql";
const dbRoot  = process.env.DB_ROOT || "root";

const db = new Sequelize(dbName,dbRoot,'',{
    host: dbHost,
    dialect: dbDialect,
    logging: false,
});

export default db;