// dbConnect.js
const mongoose = require('mongoose');
const connectDB = async (mongoURI) => {
  try {
    console.log('🔄 Connecting to MongoDB...');

    await mongoose.connect(mongoURI, {
      dbName: 'kunalDB',
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process if DB fails to connect
  }
};

module.exports = connectDB;