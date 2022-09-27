import User from "../models/User.js";
import Car from "../models/Car.js";
import { createError } from "../error.js";

export const addCar = async (req, res, next) => {
    const newCar = new Car({ sellerId: req.user.id, ...req.body });
    try {
      const savedCar = await newCar.save();
      res.status(200).json(savedCar);
    } catch (err) {
      next(err);
    }
};