import {WALLET_REQ_SUBMIT,WALLET_DETAIL_LOAD, WALLET_DETAIL_LOAD_FAIL, WALLET_REQ_SUBMIT_FAIL } from "../action/types";

const initialState = {
 transactions:[],
 error:'',
 isWalletPaid:false,
 walletStatus:'',  
 msg:'' ,
 wallet:{}
    
}

export default function(state = initialState, action)  {
    switch(action.type){
        case WALLET_REQ_SUBMIT:
            return {
                ...state,
                isWalletPaid:true,
                msg:action.payload
            }
        case WALLET_REQ_SUBMIT_FAIL:
            return {
                ...state,
                error:'Wallet request failed'
            }
        case WALLET_DETAIL_LOAD:
            return {
                ...state,
                wallet:action.payload
            }
        case WALLET_DETAIL_LOAD_FAIL:
            return{
                ...state,
                error:'LOADING FAILED'
            }

        default:
            return state;
    }
}

