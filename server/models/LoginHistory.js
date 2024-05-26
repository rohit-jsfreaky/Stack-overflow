import mongoose from 'mongoose';

const loginHistorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ip: String,
  browser: String,
  os: String,
  device: String,
  timestamp: { type: Date, default: Date.now },
});

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);

export default LoginHistory;
