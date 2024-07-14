const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Otp = require('../models/Otp');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;


// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'devthashi@gmail.com',
            pass: 'ibdu nxpf zwdf titp'
        }
    });

    const mailOptions = {
        from: 'devthashi@gmail.com',
        to: email,
        subject: 'Your OTP Verification for SLIIT  Project Module Management System',
        text: `\n Your OTP is: ${otp} \n This OTP is valid for 5 minutes. \n Do not share this OTP with anyone. \n If you did not request this OTP, please ignore this email. \n Thank you. \n SLIIT Project Management System`
    };

    const sendMail = async (transporter, mailOptions) => {
        try{
            await transporter.sendMail(mailOptions);
            console.log('OTP sent successfully');
        }
        catch(error){
            console.log('Error while sending OTP');
        }

}
    sendMail(transporter, mailOptions);
}

//send mail
  const sendEmail = async (email, password) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
          user: 'devthashi@gmail.com',
          pass: 'ibdu nxpf zwdf titp'
      }
  });
  
    let mailOptions = {
    from: `devthashi@gmail.com`,
    to: email,
    subject: 'Your new account',
    html: `Your account has been created successfully. <br/> Your password is: <strong>${password}</strong> <br/> Please login to your account and change your password. <br/> Thank you. <br/> SLIIT Project Module Management System`
    };
  
    await transporter.sendMail(mailOptions);
  };

//endpoint to send OTP
router.post('/sendOTP', async (req, res) => {
    const { email } = req.body;

    //email validation domain @my.sliit.lk
    if (!email.endsWith('@my.sliit.lk')) {
        return res.status(400).json({ message: 'Please enter a valid SLIIT Students email' });
    }
    
    const otp = generateOTP();

    try {
        const newOtp = new Otp({
            email,
            otp
        });

        await newOtp.save();
        sendOTP(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

//endpoint to verify OTP
router.post('/verifyOTP', async (req, res) => {
     
    const {email} = req.body;
    const { otp } = req.body;

    try {
        const otpData = await Otp.findOne({ email, otp });

        if (!otpData) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        await Otp.deleteOne({ email, otp });
        
        const payload = {
            email: email,
            role: 'user'
        };

        const token = jwt.sign(payload, secretKey, {
            expiresIn: 1440
        });

        // Combine the token and message into one object and send it in a single response
        res.status(200).json({ token: token, message: 'OTP verified successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



//send mail
router.post('/sendEmail', async (req, res) => {
    const { email, password } = req.body;
    try {
        await sendEmail(email, password);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;



