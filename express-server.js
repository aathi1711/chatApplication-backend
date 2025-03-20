import express from 'express'
import http from 'http'
import cors from 'cors'
import connectToDb from './Mongoose/mongoose-connect.js'
import register from './Auth/register.js'
import verifyEmail from './Auth/verify-email.js'
import login from './Auth/login.js'
import profile from './profile/profile.js'
import SearchFriends from './search-friends.js'
import setProfile from './profile/set-profile.js'
import { Server } from 'socket.io'
import sendMessage from './send.js'
import messageRouter from './message.js'
import chats from './chats.js'
import readRouter from './read.js'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin:process.env.FE_URL, methods:['GET','POST'] }, 
  });
app.use(express.json())
app.use(cors())
await connectToDb() 
app.use(express.static('public'))
app.use('/register',register)
app.use('/verify-email',verifyEmail)
app.use('/login',login)
app.use('/profile',profile)
app.use('/search',SearchFriends)
app.use('/set-profile',setProfile)
app.use('/send',sendMessage)
app.use('/message',messageRouter)
app.use('/chats',chats)
app.use('/read',readRouter)
const port = 8460
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id, new Date().toString());
    socket.on("sendMessage", (messageData) => {
      socket.broadcast.emit('receiveMessage',messageData)
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
server.listen(port,()=>{
    console.log(port, 'is running...')
})