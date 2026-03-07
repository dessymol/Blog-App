const mongoose=require('mongoose');
require('dotenv').config();
const MONGO_URI=process.env.MONGO_URI;

const connectDB=async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongoose connected successfully");
    } catch (error) {
        console.log("Mongoose connection failed",error);
    }
};
module.exports=connectDB;