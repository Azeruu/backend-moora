import { Sequelize } from "sequelize";
import Alternatif from "../models/AlternatifModel.js";
import Kriteria from "../models/KriteriaModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const NilaiAlternatifModel = db.define(
  "data_nilai_alternatif",
  {
    nama_alternatif: {
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
    nilai_real: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nilai_fuzzy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    keterangan: {
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
//   await db.sync({alter:true});
// })();
NilaiAlternatifModel.belongsTo(Alternatif,{foreignKey:"nama_alternatif"});
NilaiAlternatifModel.belongsTo(Kriteria,{foreignKey:"nama_kriteria"});


export default NilaiAlternatifModel;