import express from "express";
import { signin, signup } from "../controllers/auth.js";
import cookieParser from "cookie-parser";
const router = express.Router();
router.use(cookieParser());
//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)


export default router;
