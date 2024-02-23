import { Sequelize } from "sequelize";
import Alternatif from "./AlternatifModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const HasilModel = db.define(
  "hasil",
  {
    nama_alternatif: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nilai: {
      type: DataTypes.FLOAT,
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

export default HasilModel;