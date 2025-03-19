import jwt from "jsonwebtoken";
import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { transporter, mailOptions } from "../mail-utils.js";
const register = express.Router()
register.post('/',async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });
    bcrypt.hash(password, 10,async function(err, hash) {
       if(err){
        res.status(403).json({ message: "hash error", err });
       }else{
        const newUser = await User.create({ name, email, password:hash, isVerified: false });
          // Generate Email Verification Token (Valid for 1 hour)
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Send Verification Email
    const verificationLink = `${process.env.FE_URL}/verify-email/${token}`;

    await transporter.sendMail({
      ...mailOptions,
      to: newUser.email,
      subject: "Verify Your Email",
      html: `
      <h1>Welcome to Chatty</h1>
      <p>Have a chat with your Closed Ones <p>
      <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
    res.status(200).json({ message: "Registration successful. Please check your email to verify." });
       }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
});
export default register;