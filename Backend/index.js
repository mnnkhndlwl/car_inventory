import express, { application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.js";
import carRoute from "./routes/carRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyToken } from "./verifyToken.js";

const app = express();
dotenv.config();
app.use(cors());

const corsOptions ={
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
 }

app.use(cors(corsOptions))

// to connect our application to mongodb
const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/authentication",userRoutes);
app.use("/api/car", carRoute);

app.get("/logout", verifyToken, (req, res) => {
  return res
    .clearCookie("ac")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});


app.listen(process.env.PORT || 5000, () => {
    connect();
    console.log("Connected to Server");
  });