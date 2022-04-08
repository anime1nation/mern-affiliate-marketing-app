import {
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    USER_LOADED,
    USER_AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    OTP_SENT,
    OTP_SENT_FAIL,
    USER_LOGOUT,
    FORGET_PASSWORD_OTP_SENT_FAIL,
    FORGET_PASSWORD_OTP_SENT
} from '../action/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated : false,
    loading: true,
    user:null,
    otp:'',
    isOtpSent:false,
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                
                ...payload,
                isAuthenticated: true,
                loading: false,
                token:payload.token
            }
        case USER_LOGOUT:    
        case LOGIN_FAIL:    
        case SIGNUP_FAIL:
        case USER_AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null

            }
        case OTP_SENT:
        case FORGET_PASSWORD_OTP_SENT: 
            return {
                ...state,
                otp:payload,
                isOtpSent:true,
                loading: false,
            }
        case OTP_SENT_FAIL:
        case FORGET_PASSWORD_OTP_SENT_FAIL:    
            return {
                ...state,
                isOtpSent:false,
                loading: false,
            }
       
        default:
            return state;
    }
}