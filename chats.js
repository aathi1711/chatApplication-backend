import express from 'express'
import Chat from './models/chatModel.js';
import User from './models/userModel.js';
import { protect } from './middleware/authMiddleware.js';


const chats = express.Router();

// ✅ Get all chats where the user is a participant
chats.get("/", protect, async (req, res) => {
    try {
        const userId = req.user._id;

        // ✅ Find all chats where the user is a participant, sorted by latest message
        const chats = await Chat.find({ participants: userId })
              .populate("participants", "name email profilePic")
            .populate("lastMessage")
            .sort({ updatedAt: -1 });
            const formattedChats = chats.map(chat => {
                const oppositeUser = chat.participants.find(user => user._id.toString() !== userId.toString());
          
                return {
                  _id: chat._id,
                  oppositeUser, // ✅ Only the opposite person’s data
                  lastMessage: chat.lastMessage,
                  createdAt: chat.createdAt,
                  updatedAt: chat.updatedAt
                };
              });
        res.status(200).json(formattedChats);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error retrieving chats"});
    }
});

export default chats;
