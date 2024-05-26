import React from 'react'
import "./EmailVerify.css"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {sendBrowserOtp} from "../../actions/otp"
import { useNavigate } from 'react-router-dom'

const ChromeVerify = () => {

  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const sendOtpsubmit = (e)=>{
    e.preventDefault();

    if(email === null){
      alert("Please Enter The Email");
    }else{
      console.log("dispatched");
      console.log("Email is jsx "+email);
      localStorage.setItem('email',email);
      dispatch(sendBrowserOtp(email));
      navigate("/browser-verify-otp");
    }
  }

  
  return (
    <div>
        <div className="email-verfiy-box">
          <div  className="email-main-box">
              <h1>You have To verify Your Email First</h1>

              <form onSubmit={sendOtpsubmit}>
                <input type="email" name="" id="" className='form-text' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="submit" value="Send Otp" placeholder='submit' className='send-btn' />
              </form>
          </div>
        </div>
    </div>
  )
}

export default ChromeVerify
