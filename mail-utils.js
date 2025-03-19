import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER || '',
        pass: process.env.GMAIL_PASS || '',
    }
})
const mailOptions = {
    from: process.env.EMAIL_USER || '',
    to:['aathivdr2004@gmail.com'],
    subject:'Gmail Sending',
    text:'Sending Mails are so easy'
}
export {transporter,mailOptions}