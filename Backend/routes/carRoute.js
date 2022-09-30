import express from "express";
import { addCar,buyCar, getCar, random } from "../controllers/car.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Add a car
router.post("/", verifyToken ,addCar);

//buy a car
router.put("/buy/:id",verifyToken,buyCar);

//get a video by id
router.get("/:id",getCar);

//get all cars
router.get("/get/all", random);

export default router;

