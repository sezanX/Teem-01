const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  await mongoose.connect(env.mongodbUri);
};

module.exports = connectDB;
