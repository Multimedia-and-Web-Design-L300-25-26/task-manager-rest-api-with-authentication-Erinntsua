import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

const connectDB = async () => {
  try {
    // For testing, use in-memory MongoDB
    if (process.env.NODE_ENV === "test") {
      if (mongoose.connection.readyState === 1) {
        return;
      }
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log("MongoDB Memory Server connected");
      return;
    }

    // For production/development
    if (mongoose.connection.readyState === 1) {
      return;
    }

    // Use MongoMemoryServer if no MONGO_URI provided (for development)
    if (!process.env.MONGO_URI) {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log("MongoDB Memory Server connected (development mode)");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // In test environment, don't exit
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

export default connectDB;
