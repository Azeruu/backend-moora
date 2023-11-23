import express from "express";
import {Me, Login, Logout} from "../Controller/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
