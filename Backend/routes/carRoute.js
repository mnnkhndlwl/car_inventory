import express from "express";
import { addCar } from "../controllers/car.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Add a car
router.post("/", verifyToken ,addCar);

export default router;

