import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
},
quantity: {
type: Number,
required: true,
default: 0,
min: 0,
},
price: {
type: Number,
required: true,
default: 0,
min: 0,
},
category: {
type: String,
default: "general",
trim: true,
},
},
{
timestamps: true,
}
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;