import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Load environment variables
const DB_NAME = "chatapp";

// Connection function
const connectDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.ATLAS_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`\nMongoDB Connected! DB HOST: ${db.connection.host}`);
  } 
  catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;


// const mongoose = require('mongoose');
// import { DB_NAME } from './constants';
// import express from "express"
// const app=express();
//   ({
//     async () => {
//        try {
//        await mongoose.connect(`${process.env.ATLAS_URL}/${DB_NAME}`)
//        application.on("error",(error)=>{
//         console.log("ERRR: ",error);
//         throw error
//        })

//        application.listen(process.env.PORT,()=>{
//         console.log(`App is listenning on port ${process.env.PORT}`)
//        })
//        } catch (error) {
//           console.error("ERROR: ",error);
//           throw error
//        }
//     }
//   })()

