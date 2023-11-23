import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kriteria = db.define(
  "kriteria",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_kriteria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
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

export default Kriteria;