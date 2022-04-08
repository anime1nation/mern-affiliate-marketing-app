import {ADMIN_USER_LOAD,ADMIN_USER_LOAD_FAIL,ADMIN_WALLET_REQUEST_LOAD,ADMIN_WALLET_REQUEST_LOAD_FAIL,
        ADMIN_ENROLLED_USER_LOAD,ADMIN_ENROLLED_USER_LOAD_FAIL,
        ADMIN_SINGLE_USER_LOAD,ADMIN_SINGLE_USER_LOAD_FAIL,
    ADMIN_TRANSACTION_LOAD,ADMIN_TRANSACTION_LOAD_FAIL,
ADMIN_LOADED,
ADMIN_LOAD_FAIL,
ADMIN_LOGIN,
ADMIN_LOGIN_FAIL,
ADMIN_LOGOUT} from '../action/types';
import { setAlert } from './alert';
import axios from 'axios';
import setAdminAuthToken from '../utils/setAdminAuthToken'


export const  loadAdmin = () => async dispatch => {

    if(localStorage.adminToken){
        setAdminAuthToken(localStorage.adminToken);
    }
    try {
        const res = await axios.get('/api/admin');
        dispatch({
            type: ADMIN_LOADED,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: ADMIN_LOAD_FAIL,
            payload: { msg: err.response.statusText }
        });
    }
};

export const loginAdmin = ({
    username,password
    }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ username,password });
    try {
        const res = await axios.post('/api/admin/login', body, config);
        dispatch({
            type: ADMIN_LOGIN,
            payload: res.data
        });
        dispatch(loadAdmin());
        dispatch(setAlert('Login Successful', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload: { msg: err.response.statusText }
        });

    }
}



export const loadWalletRequest = () => async dispatch =>{

    try{

        const res = await axios.get('/api/admin/wallet-request');
        dispatch({
            type:ADMIN_WALLET_REQUEST_LOAD,
            payload:res.data
        });
        

    }catch(err){
        dispatch({
            type:ADMIN_WALLET_REQUEST_LOAD_FAIL,
        
        });
        dispatch(setAlert('Wallet Request Load Failed','danger'));
    }
  
    
    
} 


export const loadKYCRequest = () => async dispatch =>{

    
        try{
    
            const res = axios.get('/api/admin/kyc-request');
            dispatch({
                type:ADMIN_USER_LOAD,
                payload:res.data
            });
    
        }catch(err){
            dispatch({
                type:ADMIN_USER_LOAD_FAIL,
            
            });
            dispatch(setAlert('KYC Request Load Failed','danger'));
        }
    
        
        
    }


export const loadEnrolledUser = () => async dispatch =>{
try{
    const res = await axios.get('/api/admin/enrolled-user');
    dispatch({
        type:ADMIN_ENROLLED_USER_LOAD,
        payload:res.data
    });

}catch(err){
    dispatch({
        type:ADMIN_ENROLLED_USER_LOAD_FAIL,
    
    });
    dispatch(setAlert('Enrolled User Load Failed','danger'));
}
}

export const loadSingleUser = (id) => async dispatch =>{
    try{
        const res = await axios.get(`/api/admin/user/${id}`);
        dispatch({
            type:ADMIN_SINGLE_USER_LOAD,
            payload:res.data
        });
    
    }catch(err){
        dispatch({
            type:ADMIN_SINGLE_USER_LOAD_FAIL,
        
        });
        dispatch(setAlert('User Load Failed','danger'));
    }
  
    
    
}

export const loadTransaction = () => async dispatch =>{
    try{
        const res = await axios.get('/api/admin/daily-payout/all');
        dispatch({
            type:ADMIN_TRANSACTION_LOAD,
            payload:res.data
        });
    
    
    }catch(err){
        dispatch({
            type:ADMIN_TRANSACTION_LOAD_FAIL,
        
        });
        dispatch(setAlert('Transaction Load Failed','danger'));
    }
  
    
    
}

export const AdminLogOut = () => async dispatch  =>{
    dispatch({
        type:ADMIN_LOGOUT,
    });
}