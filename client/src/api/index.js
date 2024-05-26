import axios from "axios"

const API = axios.create({ baseURL: 'https://stack-overflow-eight-xi.vercel.app/' })


export const logIn = (authdata) => API.post('/user/login', authdata);
export const signUp = (authdata) => API.post('/user/signup', authdata);


export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
    
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => {

    return API.delete(`/questions/delete/${id}`);
};

export const voteQuestion = (id, value, userId) => {
    return API.patch(`/questions/vote/${id}`, { value, userId });
};


export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });


export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { id, answerId, noOfAnswers })


export const getAllUsers = () => API.get("/User/getAllUsers");


export const updateProfile = (id, updateData)=> API.patch(`/User/update/${id}`, updateData);


export const forgotPassword = (email) => {
    console.log("api hit");
    return API.post('/User/forgot-password' , email)
};


export const resetPassword = (token,id,pass) =>{
    console.log("reset api hit");
    return API.patch(`/User/reset-password/${id}/${token}` , {pass : pass});
}

export const sendOtp = (email)=>{
    console.log("Sending otp hitting api");
    console.log(email);
    return API.post("/User/email-send-otp",{email: email});
}

export const getOtp = (email) => {
    console.log("Fetching OTP from the server");
    return API.get(`/User/email-get-otp?email=${email}`);
};

export const sendMobileOtp = (mobile)=>{
    console.log("Hitting the api of the number send otp");
    return API.post("/User/mobile-send-otp",{mobile: mobile});
}


export const getMobileOtp = (mobile)=>{
    return API.get(`/User/mobile-get-otp?mobile=${mobile}`);
}

export const sendBrowserOtp = (email)=>{

    console.log("email in api " , email)
    return API.post("/User/browser-otp", {email: email});
}

export const getBroswerOtp = (email)=>{
    return API.get(`/User/browser-get-otp?email=${email}`);
}