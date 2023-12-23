import express from "express";
const router = express.Router();

router.get("/ping", async (_, res) =>{
res.cookie('tamvan', 'kuyang', { secure: true, sameSite: 'none' , path:'/' });
 res.status(200).json({msg: "PONG"})
});
router.post("/ping", async (_, res) => res.status(200).json({msg: "POST PONG"}));
router.put("/ping", async (_, res) => res.status(200).json({msg: "PUT PONG"}));
router.patch("/ping", async (_, res) => res.status(200).json({msg: "PATCH PONG"}));
router.delete("/ping", async (_, res) => res.status(200).json({msg: "DELETE PONG"}));

export default router;
