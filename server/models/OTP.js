import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  contactInfo: String,
  otp: String,
  createdAt: { type: Date, expires: '10m', default: Date.now },
});

const OTP = mongoose.model('OTP', OTPSchema);

export { OTP };
