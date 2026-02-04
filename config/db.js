import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // Mongoose will handle these options internally
      serverSelectionTimeoutMS: 30000, // Increase timeout if needed
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export default connectDB;
