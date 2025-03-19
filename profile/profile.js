import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const profile = express.Router();


profile.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default profile;
