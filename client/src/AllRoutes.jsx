import React from 'react'
import {Routes, Route}  from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import ForgotPassword from './pages/Password/ForgotPassword'
import Resetpassword from './pages/Password/Resetpassword'
import MobileVerify from './pages/Verify/MobileVerify'
import EmailVerify from './pages/Verify/EmailVerify'
import OtpVerify from './pages/Verify/OtpVerify'
import MobileOtpVerify from './pages/Verify/MobileOtpVerify'
import ChromeVerify from './pages/Verify/ChromeVerify'
import VerifyBrowserOtp from './pages/Verify/VerifyBrowserOtp'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Auth' element={<Auth />}/>
        <Route exact path='/Questions' element={<Questions/>}/>
        <Route exact path='/AskQuestion' element={<AskQuestion/>}/>
        <Route exact path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route exact path='/Tags' element={<Tags/>}/>
        <Route exact path='/Users' element={<Users/>}/>
        <Route exact path='/Users/:id' element={<UserProfile/>}/>
        <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
        <Route exact path='/reset-password/:id/:token' element={<Resetpassword/>}/>
        <Route exact path='/fr-lang-verify' element={<EmailVerify/>}/>
        <Route exact path='/fr-lang-verify-otp' element={<OtpVerify/>}/>
        <Route exact path='/mobile-lang-verify' element={<MobileVerify/>}/>
        <Route exact path='/mobile-lang-verify-otp' element={<MobileOtpVerify/>}/>
        <Route exact path='/browser-verify' element={<ChromeVerify/>}/>
        <Route exact path='/browser-verify-otp' element={<VerifyBrowserOtp/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
