
const authReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('Profile', JSON.stringify({ ...action?.data }));
            return { ...state, data: action?.data };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, data: null };
        case 'GET_OTP':
            return { ...state, otp: action.payload };
        case 'GET_MOBILE_OTP':
            console.log("this is in auth reducer",action.payload);
            return { ...state, mobileOtp: action.payload };
        case 'GET_BROWSER_OTP':
            return { ...state, browserOtp: action.payload };
        default:
            return state;
    }
};

export default authReducer;
