import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    shippingAddress: String,
    items: Array,
    totalAmount: Number,
    payment: Object,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);