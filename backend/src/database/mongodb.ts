import mongoose from 'mongoose';
import { MONGO_URI, NODE_ENV } from '../config/env';

const connectDB = async () => {
  try {
    const state = mongoose.connection.readyState;
    
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    if (state === 1) {
      return;
    }
    
    if (state === 2) {
      console.log('Already connecting to MongoDB, waiting...');
      await new Promise((resolve) => {
        const checkState = setInterval(() => {
          if (mongoose.connection.readyState === 1) {
            clearInterval(checkState);
            resolve(true);
          } else if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
             // If it failed or disconnected, stop waiting and let it try to connect again below (or fail)
             clearInterval(checkState);
             resolve(false); 
          }
        }, 100);
      });
      
      if (mongoose.connection.readyState === 1) return;
    }

    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Configure mongoose to be more robust
    if (!mongoose.connection.readyState) {
        await mongoose.connect(MONGO_URI as string, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectDB;