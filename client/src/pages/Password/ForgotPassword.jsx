import { useState } from 'react'
import React from 'react'
import "./ForgotPassword.css"
import { forgotPassword } from '../../actions/auth'
import {useDispatch} from "react-redux"


const ForgotPassword = () => {

    const [email , setEmail] = useState('');
    const dispatch = useDispatch();

    const handleForgot = (e)=>{
        e.preventDefault();

        if(!email){
            alert("Enter an email to forgot password");
        }
        else{
            console.log("dispatched");
            dispatch(forgotPassword(email));
            alert("Reset Link sent to your email please check inbox");
        }
    }

  return (
    <div className='forgot-password'>
        <div className='forgot-main-box'>
            <h1>Enter your Email</h1>
            <div className='forgot-form'>
                <form  onSubmit={handleForgot}>
                    <input type="email" className='form-text' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="submit" placeholder="submit" className='forgot-btn'/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword
