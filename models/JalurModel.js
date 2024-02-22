import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const JalurModel = db.define(
  "jalur",
  {
    kode_jalur: {
      type: DataTypes.STRING,
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

export default JalurModel;