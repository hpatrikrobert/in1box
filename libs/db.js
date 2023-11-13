import mongoose from "mongoose";

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;