import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import { response } from "express";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, isCustomer: true, password: hash });

    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT,
      {expiresIn:"3d"}
    );
  
    const { password, ...others } = user._doc; // as we don't want to send our password in response
   // res.cookie('ac', token);
  //  return res.cookie("ac", token, {
  //     httpOnly: true,
  //     maxAge: 3600000
  //   }).status(200).json(others);
  res.status(200).json({...others, accessToken});
  } catch (error) {
    next(error);
  }
};

// Logout
