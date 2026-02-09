const mongoose=require('mongoose');
require('dotenv').config();
const BlogURL=process.env.blog_URL;

const connectDB=async()=>{
    try {
        await mongoose.connect(BlogURL);
        console.log("Mongoose connected successfully");
    } catch (error) {
        console.log("Mongoose connection faied",error);
    }
};
module.exports=connectDB;