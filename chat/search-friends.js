import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const SearchFriends = express.Router();

SearchFriends.get("/", protect, async (req, res) => {
   
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search users by name or email (case-insensitive), excluding the current user
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, 
        { email: { $regex: query, $options: "i" } }
      ],
      _id: { $ne: req.user.id }, // Exclude the logged-in user
    }).select("name email profilePic");

    res.json(users);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default SearchFriends;
