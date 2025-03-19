import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyEmail = express.Router();

verifyEmail.get("/:token", async (req, res) => {
  try {
    const { token } = req.params
    if (!token) {
      return res.status(400).json({ success: false, message: "Token is missing" });
    }
    // Verify JWT and extract email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    // Find and update the user
    const user = await User.findOneAndUpdate({ email }, { isVerified: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
});
export default verifyEmail;
