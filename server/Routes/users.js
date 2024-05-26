import express from "express";
import { login, signup } from "../controllers/auth.js";
import { forgotPassword, getAllUsers,getBrowserOtp, updateProfile , resetPassword , sendOtp, verifyBrowserOtp,getOtp, sendMobileOtp,getMobileOtp} from "../controllers/users.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get('/getAllUsers', getAllUsers);
router.patch('/update/:id', updateProfile);

router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:id/:token', resetPassword);
router.post('/email-send-otp',sendOtp);
router.get('/email-get-otp',getOtp);
router.post('/mobile-send-otp',sendMobileOtp);  
router.get("/mobile-get-otp",getMobileOtp);
router.post("/browser-otp",getBrowserOtp);
router.get('/browser-get-otp',verifyBrowserOtp);

export default router;
