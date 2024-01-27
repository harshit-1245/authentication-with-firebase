const mongoose = require('mongoose');
const colors = require('colors');

require('dotenv').config();

async function connectDB() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connection successful
    console.log(colors.green.bold("Connected to MongoDB using Mongoose!"));
  } catch (error) {
    // Connection failed
    console.error(colors.red.bold(`Error connecting to MongoDB: ${error.message}`));
  }
}

// Export the connectDB function so it can be used in other files
module.exports = { connectDB };
