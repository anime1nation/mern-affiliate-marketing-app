import {ADMIN_USER_LOAD,ADMIN_USER_LOAD_FAIL,ADMIN_WALLET_REQUEST_LOAD,ADMIN_WALLET_REQUEST_LOAD_FAIL,
ADMIN_ENROLLED_USER_LOAD,ADMIN_ENROLLED_USER_LOAD_FAIL,ADMIN_SINGLE_USER_LOAD,ADMIN_SINGLE_USER_LOAD_FAIL,
ADMIN_TRANSACTION_LOAD,ADMIN_TRANSACTION_LOAD_FAIL} from '../action/types';

const initialState = {
    loading:false,
    users:[],
    walletRequests:[],
    error:null,
    user:null,
    transactions:[]
}
export default function(state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case ADMIN_USER_LOAD:
            return {
                ...state,
                users: payload
            };
        case ADMIN_USER_LOAD_FAIL:
            return {
                ...state,
                users: null,
                error: payload
            };
        case ADMIN_WALLET_REQUEST_LOAD:
            return {
                ...state,
                walletRequests: payload
            };
        case ADMIN_WALLET_REQUEST_LOAD_FAIL:
            return {
                ...state,
                walletRequests: null,
                error: payload
            };
        case ADMIN_ENROLLED_USER_LOAD:
            return {
                ...state,
                users: payload
            };
        case ADMIN_ENROLLED_USER_LOAD_FAIL:
            return{
                ...state,
                users:null
            }   
        case ADMIN_SINGLE_USER_LOAD:
            return{
                ...state,
                user:payload
            }
        case ADMIN_SINGLE_USER_LOAD_FAIL:
            return{
                ...state.error,
                user:null
            }   
        case ADMIN_TRANSACTION_LOAD:
            return{
                ...state,
                transactions:payload,
                loading:false
            }
        case ADMIN_TRANSACTION_LOAD_FAIL:
            return{
                ...state,
                transactions:[],
                loading:false,
            }                  
        default:
            return state;
    }
}


