import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId , required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, 
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true }, 
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });
const Message = mongoose.model('message',messageSchema)  
export default Message;