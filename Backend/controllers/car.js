import User from "../models/User.js";
import Car from "../models/Car.js";
import { createError } from "../error.js";

// to add a car for sell
export const addCar = async (req, res, next) => {
    const newCar = new Car({ sellerId: req.user.id, ...req.body });
    try {
      const savedCar = await newCar.save();
      res.status(200).json(savedCar);
    } catch (err) {
      next(err);
    }
};

// to buy a car
export const buyCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return next(createError(404, "no such car exists 🤔!"));
    if(car.buyerId) {
      return next(createError(403, "It has been bought"));
    }
    try {
      const updatedCar = await Car.findByIdAndUpdate(
        req.params.id,
        {
          buyerId: req.user.id,
        },
        { new: true }
      );
      res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// get car
export const getCar = async (req, res, next) => {
  try {
      const car = await Car.findById(req.params.id);
      res.status(200).json(car);
    } catch (err) {
      next(err);
    }
};

// get all cars
export const random = async (req, res, next) => {
  try {
    const cars = await Car.find({'buyerId' : null}).sort({price: -1});
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

// search car for a specific location and price range
export const byLocPrice = async (req, res, next) => {
  try {
    const cars = await Car.find({'location' : req.body.location , 'price' : {$lte: req.body.price}}).sort({price: -1});
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};


