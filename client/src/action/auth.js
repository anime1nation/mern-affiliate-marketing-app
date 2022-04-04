import axios from 'axios';
import {setAlert} from './alert';
import {
    USER_LOADED,
    USER_AUTH_ERROR,
    USER_LOGOUT,
    OTP_SENT,
    OTP_SENT_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    FORGET_PASSWORD_OTP_SENT,
    FORGET_PASSWORD_OTP_SENT_FAIL
    

} from './types';

import setUserAuthToken from '../utils/setUserAuthToken';


export const loadUser = () => async dispatch =>{
if(localStorage.token){
    setUserAuthToken(localStorage.token);
}
try {
    const  res = await axios.get('/api/auth');
    dispatch({
        type:USER_LOADED,
        payload:res.data
    });
} catch (err) {
    
    console.log(err.message);

 dispatch({
     type:USER_AUTH_ERROR
 });

}
}

export const sendOtp= ({
    name,mobile,otp
}) => async dispatch =>{
    try{

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            name,mobile,otp
        });
        const res = await axios.post('/api/user/send-otp',body,config);
        dispatch({
            type:OTP_SENT,
            payload:res.data
        });
        dispatch(setAlert('OTP sent to your mobile number.','success'));
    }catch(err){
        dispatch({
            type:OTP_SENT_FAIL,
        });
    }
};


export const forgetPasSendOtp= ({
    username,mobile,otp
}) => async dispatch =>{
    try{

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            username,mobile,otp
        });
        const res = await axios.post('/api/user/forget-password-otp/',body,config);
        dispatch({
            type:FORGET_PASSWORD_OTP_SENT,
            payload:res.data
        });
        dispatch(setAlert('OTP sent to your mobile number.','success'));
    }catch(err){
        
        const errors=err.response.data.errors;
            if(errors){
                errors.forEach(error=>setAlert(error.msg,'danger'));
            }
            dispatch({
                type:FORGET_PASSWORD_OTP_SENT_FAIL,
            });    
    }
};





export const signUp = ({name,mobile}) => async dispatch =>{
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            name,mobile
        });
        const res = await axios.post('/api/auth/sign-up',body,config);
        dispatch({
            type:SIGNUP_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
        dispatch(setAlert('Signup Successful','success'));

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:SIGNUP_FAIL
        });
    }
}


export const signIn = ({username,password}) => async dispatch =>{
    try{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            username,password
        });
        const res = await axios.post('/api/user/sign-in',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        
        dispatch(setAlert('Login Successful','success'));
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }
}

export const logout = () =>dispatch=>{
    localStorage.removeItem('token');
    dispatch({ type:USER_LOGOUT} );


   
}