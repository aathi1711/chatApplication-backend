import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
const connectToDb=async() => {
try {
    await mongoose.connect(process.env.MONGO_URI)
} catch (error) {
     console.log("Error=>", error)
    }
    }
export default connectToDb