import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    engine: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    serviceCost: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    buyerId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
