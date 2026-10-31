import mongoose from "mongoose";
import Feedback from "../models/feedbackModel.js";
import additionalFeedback from "./additionalFeedback.js";
import dotenv from "dotenv";

dotenv.config({
  path: new URL("../.env", import.meta.url)
});

const seedDatabase = async () => {
  try {
    console.log("1. Checking MongoDB URI...");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    console.log("2. Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("3. MongoDB connected!");
    console.log("Database:", mongoose.connection.name);
    console.log("4. Inserting feedback...");

    const result = await Feedback.insertMany(additionalFeedback);

    console.log(`5. Successfully inserted ${result.length} records!`);

  } catch (error) {
    console.error("SEED ERROR:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedDatabase();