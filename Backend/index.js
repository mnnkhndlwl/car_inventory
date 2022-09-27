import express, { application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.js";
import carRoute from "./routes/carRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());
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

//middlewares
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/authentication",userRoutes);
app.use("/api/car", carRoute);


app.listen(process.env.PORT || 5000, () => {
    connect();
    console.log("Connected to Server");
  });