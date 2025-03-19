import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const login = express.Router();

login.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    // Check if the user exists
    const user = await User.findOne({ email,isVerified:true});
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or Not verified" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }
    // Generate JWT token with email & role
    const token = jwt.sign(
      { id:user._id},
      process.env.JWT_SECRET
    );
    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default login
