import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const mongoDB = process.env.MONGODB_URI;

if (!mongoDB) {
  throw new Error("MongoDB connection string is not defined in the .env file.");
}

const connectDB = async() => {
    try {
        await mongoose.connect(mongoDB);
        console.log("Connected to MongoDB Atlas")
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;
