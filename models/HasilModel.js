import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import db from "../config/Database.js";
import Siswa from "./SiswaModel.js";

const { DataTypes } = Sequelize;

const Hasil = db.define(
  "Hasil",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dataSiswaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    skor_akhir: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    peringkat: {
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
//   await db.sync({alter:true});
// })();

User.hasOne(Hasil);
Siswa.hasOne(Hasil);
Hasil.belongsTo(User, { foreignkey: "userId" });
Hasil.belongsTo(Siswa, { foreignkey: "dataSiswaId" });
Hasil.belongsTo(Siswa, { foreignkey: "nama_lengkap" });

export default Hasil;