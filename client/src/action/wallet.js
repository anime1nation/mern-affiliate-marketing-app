import axios from'axios';
import { setAlert } from './alert';
import {
    WALLET_REQ_SUBMIT,WALLET_REQ_SUBMIT_FAIL
} from './types';
import setUserAuthToken from '../utils/setUserAuthToken';

export const walletReqSubmit = ({
    amount,upiId,upi,country,state,city,paySlip,remarks
}) => async dispatch => {
    if(localStorage.token){
        setUserAuthToken(localStorage.token);
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ amount,upiId,upi,country,state,city,paySlip,remarks});
        const res = await axios.post('/api/user/wallet-request', body, config);
        dispatch({
            type: WALLET_REQ_SUBMIT,
            payload: res.data
        });
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: WALLET_REQ_SUBMIT_FAIL,
            
        });

       
    }
}
