const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/clubhouse";

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("in mongoDB connection: ", err.message);
    process.exit(1);
  }
}
module.exports = connectDB;
