const mongoose=require('mongoose');
require('dotenv').config();
const BlogURI=process.env.blog_URI;

const connectDB=async()=>{
    try {
        await mongoose.connect(BlogURI);
        console.log("Mongoose connected successfully");
    } catch (error) {
        console.log("Mongoose connection failed",error);
    }
};
module.exports=connectDB;