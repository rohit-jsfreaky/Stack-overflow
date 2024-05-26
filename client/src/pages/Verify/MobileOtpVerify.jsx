import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./OtpVerify.css";
import { getMobileOtp } from '../../actions/auth';


const MobileOtpVerify = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const ogOtp = useSelector((state) => state.authReducer.mobileOtp);
    const navigate = useNavigate();
    const mobile = localStorage.getItem("mobile")

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getMobileOtp(mobile));
        }, 5000); // 5 seconds delay

        // Cleanup the timer if the component is unmounted before the delay
        return () => clearTimeout(timer);
    }, [dispatch])
    

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
        const enteredOtp = otp.join("")

        if(enteredOtp == ogOtp.otp){
            console.log("Matched");
            localStorage.setItem('isMatched', 'true');
            const label = localStorage.getItem("label");
            if(label == "English"){
                localStorage.setItem("language","en");
            }else if(label == "Spanish"){
                localStorage.setItem("language","es");
            }else if(label == "Hindi"){
                localStorage.setItem("language","hi");
            }else if(label == "Portuguese"){
                localStorage.setItem("language","pt");
            }else if(label == "Chinese"){
                localStorage.setItem("language","zh");
            }
            navigate("/");
            window.location.reload();
        }else{
            alert("Otp Does not matched");
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

export default MobileOtpVerify
