import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Siswa from "./SiswaModel.js";
const { DataTypes } = Sequelize;

const Bukti = db.define('bukti',{
    dataSiswaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        },
    ijazah_sk:{ 
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }},
    kartu_keluarga:{ 
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }},
    akta_kelahiran:{ 
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }},
    SS_lulus_dapodik:{ 
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }},
    url_ijazah: DataTypes.STRING,
    url_akta: DataTypes.STRING,
    url_kk: DataTypes.STRING,
    url_dapodik: DataTypes.STRING
},{
    freezeTableName:true
})

Siswa.hasOne(Bukti);
Bukti.belongsTo(Siswa, { foreignkey: "dataSiswaId" });

export default Bukti;

// (async () => {
//     await db.sync();
//     console.log("berhasil tersingkron semua");
// })();