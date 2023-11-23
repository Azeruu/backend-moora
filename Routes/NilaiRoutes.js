import express from "express";
import {
  getNilai,
  getNilaiById,
  createNilai,
  updateNilai,
  deleteNilai,
} from "../Controller/NilaiController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/data_nilai", verifyUser, getNilai);
router.get("/data_nilai/:id", verifyUser, getNilaiById);
router.post("/data_nilai", verifyUser, createNilai);
router.patch("/data_nilai/:id", verifyUser, updateNilai);
router.delete("/data_nilai/:id", verifyUser, deleteNilai);

export default router;
