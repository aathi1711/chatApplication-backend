import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, 
    profilePic: { type: String, default: "" }, 
    isOnline: { type: Boolean, default: false },
    isVerified: { type: Boolean, required:true },
  }, { timestamps: true });

  const User  = mongoose.model("users", userSchema);
  export default User