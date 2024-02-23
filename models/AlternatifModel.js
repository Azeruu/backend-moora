import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import Jalur from "./JalurModel.js";
import db from "../config/Database.js";
import Hasil from "./HasilModel.js";

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
    nama_jalur: {
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
User.hasMany(AlternatifModel);
Jalur.hasMany(AlternatifModel);
AlternatifModel.hasOne(Hasil);


export default AlternatifModel;