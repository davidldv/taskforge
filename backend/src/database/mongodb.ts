import mongoose from 'mongoose';
import { MONGO_URI, NODE_ENV } from '../config/env';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(MONGO_URI as string);

    console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // In serverless, we shouldn't exit the process, but let the request fail
    throw error;
  }
}

export default connectDB;