import {
    ADMIN_LOGIN,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOADED,
    ADMIN_LOAD_FAIL,
    ADMIN_LOGOUT

} from '../action/types';

const initialState = {
    adminToken: localStorage.getItem('adminToken'),
    loading: false,
    admin: null,
    isAuthenticated: false,
    
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
        case ADMIN_LOGOUT:
        case ADMIN_LOAD_FAIL:         
         localStorage.removeItem('adminToken');   
            return {
                loading: false,
                isAuthenticated: false,
                admin: null,
                adminToken:null,
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
        
        default:
            return state;
    }
}

export default adminReducer;