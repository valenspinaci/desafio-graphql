import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const testEmail = process.env.TEST_MAIL;
const testPassword = process.env.TEST_PASSWORD;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: testEmail,
        pass: testPassword
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {transporter, testEmail};