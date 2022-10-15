import express from "express";
import { verifyToken } from "../verifyToken.js";
import { pay } from "../controllers/stripe.js";

const router = express.Router();

router.post("/payment",verifyToken, pay);

export default router;