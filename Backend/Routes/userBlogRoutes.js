const express=require('express');
const app=express();
const router=express.Router();
const userModel=require('../Models/userData')
const jwt=require('jsonwebtoken')

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const user = new userModel(req.body);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // res.json({ message: "Login successful", user });
    const payload={uname:req.body.email,pwt:req.body.password};
    const token=jwt.sign(payload,"secret")
    res.status(200).send({message:"Login successful",usertoken:token})
     
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;