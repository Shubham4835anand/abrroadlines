import mongoose from 'mongoose';
import logger from './logger.js';

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/abrroadlines';

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    logger.info(`MongoDB Connected successfully to: ${uri}`);
  } catch (error) {
    logger.warn(`MongoDB connection failed (${error.message}). Running with robust fallback mode.`);
    isConnected = false;
  }
}

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

