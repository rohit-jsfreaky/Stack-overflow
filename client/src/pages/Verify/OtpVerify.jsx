import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./OtpVerify.css";
import { getOtp } from '../../actions/auth';

const OtpInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const ogOtp = useSelector((state) => state.authReducer.otp); // Ensure correct key
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        const timer = setTimeout(() => {
            dispatch(getOtp(email));
        }, 5000); // 5 seconds delay

        // Cleanup the timer if the component is unmounted before the delay
        return () => clearTimeout(timer);
    }, [dispatch]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        console.log("Entered OTP:", enteredOtp);
        console.log("Original OTP from server:", ogOtp);

        if (enteredOtp == ogOtp) {
            console.log("Matched");
            localStorage.setItem('isMatched', 'true');
            localStorage.setItem('language', 'fr');
            navigate("/");
            window.location.reload();
            localStorage.setItem('isMatched', 'false');
        } else {
            alert("Otp Does not match");
            localStorage.setItem('isMatched', 'false');
        }
    };

    return (
        <div className="otp-verify-box">
            <div className="otp-main-box">
                <h1>Enter The OTP</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                className="otp-input"
                                maxLength="1"
                                value={data}
                                onChange={e => handleChange(e, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                ref={el => inputs.current[index] = el}
                            />
                        ))}
                    </div>
                    <input
                        type="submit"
                        value="Submit OTP"
                        className="send-btn"
                    />
                </form>
            </div>
        </div>
    );
};

export default OtpInput;
