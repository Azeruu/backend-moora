import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const AlternatifModel = db.define(
  "data_alternatif",
  {
    kode_alternatif: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_alternatif: {
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


export default AlternatifModel;