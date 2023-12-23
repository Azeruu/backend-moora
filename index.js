import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import FileUpload from "express-fileupload"
import NilaiRoute from "./Routes/NilaiRoutes.js";
import RekapNilaiRoute from "./Routes/RekapNilaiRoutes.js";
import UserRoute from "./Routes/UserRoutes.js";
import SiswaRoute from "./Routes/SiswaRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import JalurRoute from "./Routes/JalurRoutes.js";
import KriteriaRoute from "./Routes/KriteriaRoutes.js";
import HasilRoute from "./Routes/HasilRoutes.js";
import BuktiRoute from "./Routes/BuktiRoutes.js"
import PingRoutes from "./Routes/PingRoutes.js";
import db from "./config/Database.js";
dotenv.config();

const app = express();

 (async () => {
     await db.sync();
    console.log("berhasil tersingkron semua");
 })();

const sessionStore = SequelizeStore(session.Store); 

const store = new sessionStore({
    db: db
});
// app.set('trust proxy', true);
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure:true,
        sameSite: 'None',
        httpOnly: true,
        path: '/',
    },
    proxy:true
}));

app.use(cors({
    origin: 'https://frontend.azeru.live',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Mengizinkan semua metode
    allowedHeaders: 'Content-Type', // Mengizinkan semua header
    credentials: true, // Mengizinkan penggunaan kredensial (cookie)
    optionsSuccessStatus: 204,
}));

app.use(FileUpload());
app.use(express.static("public"));
app.use(express.json());
app.use(JalurRoute);
app.use(KriteriaRoute);
app.use(UserRoute);
app.use(NilaiRoute);
app.use(HasilRoute);
app.use(BuktiRoute);
app.use(RekapNilaiRoute);
app.use(SiswaRoute);
app.use(AuthRoutes);
app.use(PingRoutes);

 store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log("Server running on port " + process.env.APP_PORT);
});
