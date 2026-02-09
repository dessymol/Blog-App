const express=require('express');
const app=express();
const blogAppRoutes=require('./Routes/blogRoutes');
const userBlogRoutes=require('./Routes/userBlogRoutes');
const cors=require('cors');
const jwt=require('jsonwebtoken')
const connectDB = require('./db');
require('dotenv').config();

const PORT=process.env.PORT||3000;
connectDB();

app.use(express.json());
app.use(cors());
app.use('/blog',blogAppRoutes);
app.use('/auth',userBlogRoutes);
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})