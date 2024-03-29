import { Sequelize } from "sequelize";
import NilaiAlternatifModel from "./NilaiAlternatifModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const KriteriaModel = db.define(
  "data_kriteria",
  {
    kode_kriteria: {
      type: DataTypes.STRING,
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
    bobot_kriteria: {
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
//   await db.sync({alter:true});
// })();
KriteriaModel.hasMany(NilaiAlternatifModel);
export default KriteriaModel;
