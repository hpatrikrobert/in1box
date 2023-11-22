import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", 'Internal Server Error');
  }
};

export default connectDB;
