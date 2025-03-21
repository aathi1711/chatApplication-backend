import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
import Message from '../models/messageModel.js';

const readRouter = express.Router()
readRouter.put('/',protect,async(req, res) => {
    try {
        const { chatId } = req.body;
        const userId = req.user._id; // Get logged-in user

        // Update messages where receiver is the logged-in user
        await Message.updateMany(
            { chatId, receiver: userId, isRead: false },
            { $set: { isRead: true } }
        );
        res.json({message:'mark as read successfully'})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}) 
export default readRouter;