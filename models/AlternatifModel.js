import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import Jalur from "./JalurModel.js";
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
    nama_jalur: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
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
AlternatifModel.belongsTo(User,{foreignkey:'userId'});
AlternatifModel.belongsTo(Jalur,{foreignkey:'nama_jalur'});


export default AlternatifModel;