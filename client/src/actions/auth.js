import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const signUp = (authdata, navigate) => async (dispatch) => {

    try {
        const { data } = await api.signUp(authdata);
        dispatch({ type: 'AUTH', data })
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate("/")
    } catch (error) {
        console.log(error)
    }
}

export const login = (authdata, navigate) => async (dispatch) => {

    try {
        const { data } = await api.logIn(authdata);
        dispatch({ type: 'AUTH', data })
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate("/")
    } catch (error) {
        console.log(error)
    }
}

export const forgotPassword = (email) => async (dispatch) => {

    try {
        console.log("auth")
        await api.forgotPassword(email);
    } catch (error) {
        console.log(error);
    }

}

export const resetPassword = (token, id, pass) => async (dispatch) => {
    try {

        console.log("hitting action")
        await api.resetPassword(token, id, pass);
    } catch (error) {
        console.log(error);
    }
}


export const getOtp = (email) => async (dispatch) => {
    try {
        console.log("Fetching the OTP");
        const { data } = await api.getOtp(email);
        dispatch({ type: 'GET_OTP', payload: data.otp });
    } catch (error) {
        console.log("Error fetching OTP:", error);
    }
}


export const getMobileOtp = (mobile)=>async (dispatch)=>{
    
    try {
        console.log("Geeting the mobile otp");
        const {data} = await api.getMobileOtp(mobile);
        console.log("data is aciton" ,data);
        dispatch({ type: 'GET_MOBILE_OTP', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getBroswerOtp = (email) => async (dispatch) => {

    try {
        console.log("geeting the otp");
        const { data } = await api.getOtp(email);
        dispatch({ type: 'GET_BROWSER_OTP', payload: data })
        
    } catch (error) {
        console.log("error");
    }
}