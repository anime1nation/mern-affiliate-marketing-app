import {USER_ENROLLED,USER_ENROLL_FAIL} from "../action/types";
const initialState = {
    isLoading: true,
    msg:'',
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_ENROLLED:
            return {
                ...state,
                isLoading: false,
                msg:payload
            }
        case USER_ENROLL_FAIL:
            return {
                ...state,
                isLoading: false,
                msg:'Enrollment failed'
            }
        default:
            return state;
        }          
}