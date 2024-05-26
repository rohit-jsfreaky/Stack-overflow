import jwt from 'jsonwebtoken'
import bycrypt from 'bcryptjs'
import users from "../models/auth.js"
import mongoose from 'mongoose'
import LoginHistory from "../models/LoginHistory.js"



import moment from 'moment';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." })
    }

    const hashedPassword = await bycrypt.hash(password, 12);
    const newUser = await users.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
}

export const login = async (req, res) => {
  const { email, password, ip, browser, os, device } = req.body;

  console.log(ip);
  console.log(browser);
  console.log(os);
  console.log(device);

  try {
    const existinguser = await users.findOne({ email });

    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist" });
    }


    const isPasswordCrt = await bycrypt.compare(password, existinguser.password);

    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const currentTime = moment();
    const currentHour = currentTime.hour();

    if (device === 'mobile' && (currentHour < 10 || currentHour > 13)) {
      return res.status(403).json({ message: 'Access denied: Mobile access is only allowed from 10 AM to 1 PM' });
    }

    await LoginHistory.create({
      userId: existinguser._id,
      ip,
      browser,
      os,
      device,
    });

    const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }

}

