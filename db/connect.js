const mongoose = require('mongoose');

require('dotenv').config();

// Initializes the MongoDB connection using Mongoose
const initDb = async (callback) => {
  try {
    // Connects Mongoose to the existing cse341 database
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'cse341'
    });

    console.log('Connected to MongoDB with Mongoose');

    // Returns the native MongoDB database object temporarily
    // so the existing controllers continue working during migration
    callback(null, mongoose.connection.db);
  } catch (error) {
    // Sends connection errors back to server.js
    callback(error);
  }
};

// Provides access to the active MongoDB database connection
// This function is temporary while the controllers are migrated to Mongoose models
const getDb = () => {
  // readyState 1 means Mongoose is successfully connected
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not initialized');
  }

  return mongoose.connection.db;
};

module.exports = {
  initDb,
  getDb
};