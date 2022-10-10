import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
  };

//   export const verifyToken = (req, res, next) => {
//     var token = req.cookies.ac;
//    console.log(token);
//    if(!token) {
//        return next(createError(401, "You are not authenticated!"));
//    }

//    jwt.verify(token, process.env.JWT,(err,user) => {
//        if (err) return next(createError(403, "Token is not valid!"));
//        req.user = user;
//        next()
//    })
//  };