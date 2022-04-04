import {
    ADMIN_LOGIN,
    ADMIN_LOGIN_FAIL,
    ADMIN_ADDED,
    ADMIN_ADD_FAIL,
    ADMIN_LOADED,
    ADMIN_LOAD_FAIL,

} from '../action/types';

const initialState = {
    adminToken: localStorage.getItem('adminToken'),
    loading: false,
    error: null,
    admin: null,
    isAuthenticated: false,
    newAdmin: null,
}

 const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADMIN_LOGIN:
            localStorage.setItem('adminToken', payload.admintoken);
            return {
                ...state,
                ...payload,
                adminToken: payload.admintoken,
                loading: true,
                isAuthenticated: true,
                
            }
        case ADMIN_LOGIN_FAIL:
            
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                admin: null,
                error: payload,
            }
        case ADMIN_LOADED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                admin: payload,
                error: null,
            }
        case ADMIN_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                admin: null,
                error: payload,
            }
        case ADMIN_ADDED:
            return {
                ...state,
                loading: false,
                newAdmin: payload,
               
            }
        case ADMIN_ADD_FAIL:
            return {
                ...state,
                loading: false,
                isAdded: null,
                
            }
        default:
            return state;
    }
}

export default adminReducer;