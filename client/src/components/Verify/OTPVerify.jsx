// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { requestOTP, verifyOTP } from '../../actions/otp';
// import { useTranslation } from 'react-i18next';

// const OTPVerify = ({ method }) => {
//   const [contactInfo, setContactInfo] = useState('');
//   const [otp, setOTP] = useState('');
//   const [step, setStep] = useState(1);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   const { message } = useSelector((state) => state.otpReducer);

//   const handleRequestOTP = (e) => {
//     e.preventDefault();
//     dispatch(requestOTP({ contactInfo, method }));
//     setStep(2);
//   };

//   const handleVerifyOTP = (e) => {
//     e.preventDefault();
//     dispatch(verifyOTP({ contactInfo, otp }));
//     navigate('/');
//   };

//   return (
//     <div className="otp-verify-container">
//       {step === 1 && (
//         <form onSubmit={handleRequestOTP}>
//           <h2>{t('Enter your contact information')}</h2>
//           <input
//             type="text"
//             value={contactInfo}
//             onChange={(e) => setContactInfo(e.target.value)}
//             placeholder={method === 'email' ? t('Email') : t('Mobile Number')}
//             required
//           />
//           <button type="submit">{t('Send OTP')}</button>
//         </form>
//       )}
//       {step === 2 && (
//         <form onSubmit={handleVerifyOTP}>
//           <h2>{t('Enter the OTP')}</h2>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOTP(e.target.value)}
//             placeholder={t('OTP')}
//             required
//           />
//           <button type="submit">{t('Verify OTP')}</button>
//         </form>
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default OTPVerify;
