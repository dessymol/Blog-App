const express=require('express');
const app=express();
const router=express.Router();
const blogModel=require('../Models/blogDatas')
const jwt =require('jsonwebtoken')

//Adding middleware
function verifytoken(req,res,next){
    let token= req.headers.token;
    try{
        if(!token)throw 'Unauthorised Access'
        let paylod=jwt.verify(token,"secret")
        if(!paylod)throw 'Unauthorised Access'
        next()
    }catch(error){
        res.json({message:error})
    }
}

router.get('/',async(req,res)=>{
    try {
        const blog= await blogModel.find();
        res.json(blog); 
    } catch (error) {
        res.status(500).json({message:"Error fetching blog",error});
    }
});
router.post('/add',verifytoken,async(req,res)=>{
    try {
        const newblog=new blogModel(req.body);
         await newblog.save(); 
        res.status(201).json({message:"User Blog added successfully",newblog})
    } catch (error) {
        res.status(500).json({message:"Error creating user blog",error})
    }
});
router.put('/update/:id',verifytoken,async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedBlog=await blogModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json({message:"Blog updated successfully",updatedBlog})
    } catch (error) {
        res.status(500).json({message:"Error occure",error});
    }
});
router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const bolg=await blogModel.findById(id);
        res.json(blog);
    } catch (error) {
        res.status(500).json({message:"Id not found",error});
    }
});
router.delete('/delete/:id',verifytoken,async(req,res)=>{
     try {
        const{id}=req.params;
        await blogModel.findByIdAndDelete(id);
        res.json({message:"Blog deleted successfully",blogModel});
     } catch (error) {
        res.status(500).json({message:"Error deleting blog",error});
     }
});

module.exports=router;