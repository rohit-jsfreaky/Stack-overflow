import * as api from "../api";

export const sendOtp = (email)=> async (dispatch)=>{
  

  try {
    console.log("Sending Otp");
    await api.sendOtp(email);
  } catch (error) {
    
  }
}

export const sendMobileOtp =(mobile)=> async (dispatch)=>{
  try {
    console.log("Mobile Action");
    await api.sendMobileOtp(mobile);
  } catch (error) {
    
  }
}

export const sendBrowserOtp = (email) => async(dispatch)=>{

  try {

    console.log("Sending Otp " + email);
    await api.sendBrowserOtp(email);
  } catch (error) {
    
  }
  
}