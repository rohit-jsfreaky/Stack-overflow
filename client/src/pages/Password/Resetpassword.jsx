import React from 'react'
import { useState } from 'react'
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import "./Resetpassword.css"
import { resetPassword } from '../../actions/auth'

const Resetpassword = () => {

    const dispatch = useDispatch();
    const [pass,setPass] = useState(null);
    const [confirmPass , setConfirmPass] = useState(null);
    const navigate = useNavigate();

    const {id} = useParams();
    const {token} = useParams();
    const handleReset = (e)=>{

        e.preventDefault();

        

        if(pass !== confirmPass){
            alert("Password did not matched");
        }else{
            console.log("Handling reset");
            dispatch(resetPassword(token,id,pass));
            alert("password has been changed");
            navigate("/Auth");
        }
    }


  return (
    <div className='reset-password'>
        <div className='reset-main-box'>
            <div className='reset-form'>
                <form onSubmit={handleReset}>
                   <label htmlFor="forgot-password">Create Password</label>
                    <input type="password" className='form-text' placeholder='Create-Password' name='forgot-password'  id='forgot-password' onChange={(e)=>{setPass(e.target.value)}} />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" className='form-text' placeholder='Confirm-Password' name='confirm-password'  id='confirm-password'  onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                    <input type="submit" placeholder="submit" className='forgot-btn'/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Resetpassword
