import Stripe from "stripe";
import dotenv from "dotenv";
import { createError } from "../error.js";
dotenv.config();
const KEY = process.env.STRIPE_KEY;

const stripe = Stripe(KEY);

export const pay = async (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(200).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
};
