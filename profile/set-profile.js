import express from 'express'
import multer from 'multer'
import path from 'path'
import cloudinary from '../cloudinary.js'
import { protect } from '../middleware/authMiddleware.js'
import User from '../models/userModel.js'
const setProfile = express.Router()
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
setProfile.post('/',protect,upload.single('file'), async(req,res)=>{
    try {
         await cloudinary.uploader
         .upload(req.file.path)
         .then(async(result)=>
            await User.findByIdAndUpdate(req.user.id,{profilePic:result.secure_url}))
        .catch((err)=>console.log('err',err))
        res.send({msg:'success'})
       
    } catch (error) {
       res.status(500).send({msg:'not ok'}) 
    }
})
export default setProfile;