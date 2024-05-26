import React, { useState } from 'react';
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import './MobileVerify.css'; // Ensure you have this CSS file for styling
import { sendMobileOtp } from '../../actions/otp';

const MobileVerify = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
    } else {
      console.log('Sending OTP to:', phoneNumber);
      localStorage.setItem("mobile" , phoneNumber);
      dispatch(sendMobileOtp(phoneNumber));
      navigate("/mobile-lang-verify-otp");
    }
  };

  return (
    <div>
      <div className="mobile-verify-box">
        <div className="mobile-main-box">
          <h1>You have to verify your phone number first</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="phone"
              value={phoneNumber}
              onChange={handleChange}
              className="form-text"
              placeholder="Enter your phone number"
            />
            <input
              type="submit"
              value="Send OTP"
              className="send-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileVerify;
