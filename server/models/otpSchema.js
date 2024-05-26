import mongoose from 'mongoose';

const otpSchema = mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: { type: Date, expires: '5m', default: Date.now }  
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp
