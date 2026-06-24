import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import appRoutes from './app.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Database Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('🚀 MongoDB database connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// API Routes
app.use('/api', appRoutes);

// Start the Backend Server
app.listen(PORT, () => {
  console.log(`📡 Server is running smoothly on http://localhost:${PORT}`);
});
