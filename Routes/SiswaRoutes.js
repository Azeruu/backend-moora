import express from "express";
import {
  getSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../Controller/SiswaController.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/data_siswa", verifyUser, getSiswa);
router.get("/data_siswa/:id", verifyUser,getSiswaById);
router.post("/data_siswa", verifyUser,createSiswa);
router.patch("/data_siswa/:id", verifyUser,updateSiswa);
router.delete("/data_siswa/:id", verifyUser, deleteSiswa);

export default router;
