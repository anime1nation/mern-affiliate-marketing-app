import axios from 'axios';
import {setAlert} from './alert';

import setUserAuthToken from '../utils/setUserAuthToken';
export const enroll = ({
                referalId,
                uplinkId,
                name,
                address1,
                address2,
                dob,
                password,
                email,
                enrollPackage,
                username,
}) => async dispatch => {
    if(localStorage.token){
        setUserAuthToken(localStorage.token);
    }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
                referalId,
                uplinkId,
                name,
                address1,
                address2,
                dob,
                password,
                email,
                uplinkId,
                username,
                enrollPackage
        });
        const res = await axios.post('/api/user/enroll', body, config);
        dispatch({
            type: 'USER_ENROLLED',
            payload: res.data
        });
        dispatch(setAlert('Enrollment Successfull', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:'USER_ENROLL_FAIL'
        });
    }
}

