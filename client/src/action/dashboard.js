import axios from 'axios';
import {DASHBOARD_LOADED,DASHBOARD_LOAD_FAIL,DOWNLINE_LOADED,DOWNLINE_LOAD_FAIL } from './types';
import { setAlert } from './alert';
import setUserAuthToken from '../utils/setUserAuthToken';
export const loadDashboard = ({
    referId 
}) => async dispatch => {

    try{
        const res = await axios.get(`/api/dashboard/get-downline/${referId}`);
        dispatch({
            type:DASHBOARD_LOADED,
            payload:res.data
        });
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }


        dispatch({
            type:DASHBOARD_LOAD_FAIL,
        });
    }
    
}



export const loadDownline = ({
    userid
}) => async dispatch => {
    if(localStorage.token){
        setUserAuthToken(localStorage.token);
    }
        try{
            console.log(userid);
            const res = await axios.get(`/api/dashboard/get-downline/${userid}`);
            dispatch({
                type:DOWNLINE_LOADED,
                payload:res.data.firstGen
            });
            console.log(res.data.firstGen);
        }catch(err){
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
            }
            dispatch({
                type:DOWNLINE_LOAD_FAIL});
            }
} 

        