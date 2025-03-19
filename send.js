import express from 'express'
import Message from './models/messageModel.js';
import { protect } from './middleware/authMiddleware.js';
import startChat from './chatController.js';
import Chat from './models/chatModel.js';
const sendMessage = express.Router();

sendMessage.post("/",protect,startChat, async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    let chat = await Chat.findOne({
      participants: { $all: [sender, receiver] },
  });
    if (!chat) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const message = new Message({ sender, receiver, chatId:chat._id, content });
    await message.save();
    await Chat.findByIdAndUpdate(chat._id, { lastMessage: message._id });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
export default sendMessage;
