import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import Nilai from "./NilaiModel.js"
import Siswa from "./SiswaModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const RekapNilai = db.define(
  "rekap_nilai",
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
    avrg_nilai_pkn: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    avrg_nilai_bindo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    avrg_nilai_mtk: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    avrg_nilai_ips: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    avrg_nilai_ipa: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jarak: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    usia: {
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
// User.hasOne(RekapNilai);
// Siswa.hasOne(RekapNilai);
RekapNilai.belongsTo(User, { foreignkey: "userId" });
RekapNilai.belongsTo(Siswa, { foreignkey: "dataSiswaId" });
RekapNilai.belongsTo(Siswa, { foreignkey: "nama_lengkap" });
RekapNilai.belongsTo(Siswa, { foreignkey: "jarak" });
RekapNilai.belongsTo(Siswa, { foreignkey: "usia" });

export default RekapNilai;