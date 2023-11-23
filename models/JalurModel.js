import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Jalur = db.define(
  "jalur",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_jalur: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
  },
  {
    freezeTableName: true,
  }
);
// (async()=>{
//   await db.sync();
// })();

export default Jalur;