import mongoose from "mongoose";
import User from "../models/auth.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import springedge from "springedge"
import Otp from "../models/otpSchema.js"
let otp;

export const getAllUsers = async (req, res) => {

  try {
    const allUsers = await User.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });

    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}


export const updateProfile = async (req, res) => {

  const { id: _id } = req.params;

  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json("Question unavailable");
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true })

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message })
  }
}


export const forgotPassword = async (req, res) => {

  const email = Object.keys(req.body)[0]


  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(404).json("User Does'nt Exists");
    }

    const secret = process.env.JWT_SECRET;

    const token_server = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "5m" });



    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });


    transporter.verify((error, success) => {
      if (error) {
        console.error('Error with transporter configuration:', error);
      } else {
        console.log('Server is ready to take our messages:', success);
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Test Email',
      html: `<p>You requested for a password reset</p>
      <p>Click this <a href="$https://stack-overflow-vklo.vercel.app/reset-password/${user._id}/${token_server}">link</a> to reset your password</p>`

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

  } catch (error) {
    res.status(500).json({ message: error });
  }


}


export const resetPassword = async (req, res) => {

  const { id: _id } = req.params;
  const { token } = req.params;
  const { pass } = req.body;


  console.log(_id);
  console.log(token);
  console.log(pass);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const hashedPassword = await bcrypt.hash(pass, 12);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    console.log("resets succesully");

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Invalid or expired token' });
  }

}



export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);

  try {
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error('Error with transporter configuration:', error);
      } else {
        console.log('Server is ready to take our messages:', success);
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for verification',
      text: `${otp} is your OTP for email verification`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send OTP email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}





export const getOtp = async (req, res) => {
  const { email } = req.query;

  console.log(email);

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ message: 'OTP not found or expired' });
    }

    res.status(200).json({ otp: otpRecord.otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const sendMobileOtp = async (req, res) => {

  console.log("Finally in the server controller");
  let { mobile } = req.body;


  console.log(mobile);
  otp = Math.floor(100000 + Math.random() * 900000);;

  mobile = "91" + mobile;

  try {

    await Otp.findOneAndUpdate(
      { email: mobile },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    var params = {
      'sender': 'SEDEMO',
      'apikey': process.env.OTP_API,
      'to': [
        mobile  //Moblie Numbers 
      ],
      'message': `Hello, This is a ${otp} message from spring edge`,
      'format': 'json'
    };

    springedge.messages.send(params, 5000, function (err, response) {
      if (err) {
        return console.log(err);
      }
      console.log(response);
    });
    console.log("message has been sent");
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const getMobileOtp = async (req, res) => {

  let { mobile } = req.query;
  mobile = "91" + mobile;
  try {

    const otpRecord = await Otp.findOne({ email: mobile });

    if (!otpRecord) {
      return res.status(404).json({ message: 'OTP not found or expired' });
    }

    res.status(200).json({ otp: otpRecord.otp });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const getBrowserOtp = async (req, res) => {

  console.log(req.body);
  const { email } = req.body;

  otp = Math.floor(100000 + Math.random() * 900000);;
  console.log(otp);
  console.log(email);
  try {
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error('Error with transporter configuration:', error);
      } else {
        console.log('Server is ready to take our messages:', success);
      }
    });


    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Language change otp Verify',
      text: ` ${otp}  is Your Otp for Language change email verification`

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


export const verifyBrowserOtp = async (req, res) => {
  const { email } = req.query;

  console.log(email);

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ message: 'OTP not found or expired' });
    }

    res.status(200).json({ otp: otpRecord.otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}