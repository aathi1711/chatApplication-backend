import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" }, 
  }, { timestamps: true });

const Chat = mongoose.model('chat',chatSchema)
export default Chat;
  