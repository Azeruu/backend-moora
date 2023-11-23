import { Sequelize } from "sequelize";
import db from "../config/Database.js"
const { DataTypes } = Sequelize;

const Bukti = db.define('bukti',{
    nama: DataTypes.STRING,
    filebukti: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName:true
})

export default Bukti;

// (async () => {
//     await db.sync();
//     console.log("berhasil tersingkron semua");
// })();