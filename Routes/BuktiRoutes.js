import express from "express";
import {
  getBukti,
  getBuktiById,
  saveBukti,
  updateBukti,
  deleteBukti,
} from "../Controller/BuktiController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/bukti", verifyUser, getBukti);
router.get("/bukti/:id", verifyUser, getBuktiById);
router.post("/bukti", verifyUser, saveBukti);
router.patch("/bukti/:id", verifyUser, updateBukti);
router.delete("/bukti/:id", verifyUser, deleteBukti);

export default router;
