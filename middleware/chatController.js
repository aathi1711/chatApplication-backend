import Chat from "../models/chatModel.js";


const startChat = async (req, res, next) => {
    try {
        const { receiver } = req.body; // Get the receiver's ID

        if (!receiver) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        // Check if a chat already exists between sender and receiver
        let chat = await Chat.findOne({
            participants: { $all: [req.user._id, receiver] },
        });

        // If chat does not exist, create a new chat
        if (!chat) {
            chat = await Chat.create({
                participants: [req.user._id, receiver],
            });
        }
       
        // Attach chatId to request object for further use
        req.chatId = chat._id;
        next(); // Move to the next middleware (sendMessage)

    } catch (error) { 
        res.status(500).json({ message: "Error checking or creating chat" });
    }
};

export default startChat;
