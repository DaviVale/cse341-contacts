const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db('cse341');
      console.log('Connected to MongoDB');
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};