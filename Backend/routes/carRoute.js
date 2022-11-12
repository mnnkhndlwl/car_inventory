import cookieParser from "cookie-parser";
import express from "express";
import { addCar,buyCar, byLocPrice, byname, getCar, random,randomOne } from "../controllers/car.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.use(cookieParser());

//Add a car
router.post("/buyCar",verifyToken,addCar);

//buy a car
router.put("/buy/:id",verifyToken,buyCar);

//get a video by id
router.get("/:id",getCar);

//get all cars
router.get("/get/all", random);

//get all cars for admin
router.get("/get/allOrders", randomOne);

//search by location and price
router.post("/get/byLocPrice" , byLocPrice);

//search by name
router.get("/get/byname" , byname);

export default router;

