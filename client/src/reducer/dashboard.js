import { DASHBOARD_LOADED,DASHBOARD_LOAD_FAIL,DOWNLINE_LOADED,DOWNLINE_LOAD_FAIL } from "../action/types";
const initialState = {
    isLoading: true,
    userDownline:[],
    downline:[],
};


export default function (state = initialState, action) {
    const {type,payload} = action;
    switch (type) {
        case DASHBOARD_LOADED:
            return {
                ...state,
                isLoading: false,
                userDownline:payload,
                downline:[]

                }
        case DASHBOARD_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        case DOWNLINE_LOADED:
            return {
                ...state,
                downline:payload, 
                isLoading: false,    
            }
        case DOWNLINE_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
            }
         default:
            return state;               
        }
}
