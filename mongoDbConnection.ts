import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const devUri="mongodb://127.0.0.1:27017/clubhouse?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6";
const uri:string = process.env.MONGODB_URI||"";

async function connectDB() {
  try {
    await mongoose.connect(uri,{
      serverSelectionTimeoutMS: 5000, // 5 seconds
    });

    console.log("Connected to MongoDB");
  } catch (err:any) {
    console.log("in mongoDB connection: ", err.message);
    //process.exit(1);
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to HERE!!' + uri);
});
 
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
}); 

export default connectDB; 
