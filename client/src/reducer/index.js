import { combineReducers } from "redux";
import  alert from './alert';
import  auth  from './auth';
import wallet from './wallet';
import dashboard from './dashboard';
import { reducer as burgerMenu} from 'redux-burger-menu';
import admin from './admin';
import adminAuth from './adminAuth';
export default combineReducers({
    alert,
    auth,
    wallet,
    dashboard,
    admin,
    adminAuth,
    burgerMenu
});