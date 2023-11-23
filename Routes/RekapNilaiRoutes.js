import express from "express";
import {
  getNilai,
  getNilaiById,
  createRekap,
  updateNilai,
  deleteNilai,
} from "../Controller/RekapNilaiController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/rekap_nilai", verifyUser, getNilai);
router.get("/rekap_nilai/:id", verifyUser, getNilaiById);
router.post("/rekap_nilai", verifyUser, createRekap);
router.patch("/rekap_nilai/:id", verifyUser, updateNilai);
router.delete("/rekap_nilai/:id", verifyUser, deleteNilai);

export default router;
