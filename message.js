import express from 'express'
import { protect } from './middleware/authMiddleware.js';
import Chat from './models/chatModel.js';
import Message from './models/messageModel.js';

const messageRouter = express.Router();
messageRouter.get("/:chatId", protect, async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id; // ✅ Get logged-in user's ID

        // ✅ Check if the chat exists & user is a participant
        const chat = await Chat.findOne({ _id: chatId, participants: userId });
        if (!chat) return res.status(404).json({ message: "Chat not found" });

        // ✅ Retrieve messages, sorted by createdAt
        const messages = await Message.find({ chatId })
            .sort({ createdAt: 1 });

        res.status(200).send(messages);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving messages" });
    }
});
export default messageRouter;
