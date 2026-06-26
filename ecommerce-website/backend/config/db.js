import mongoose from "mongoose";

const connectDB = async () => {
  console.log("MONGO_URI =", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ DB error:", error.message);
    process.exit(1);
  }
};

export default connectDB;