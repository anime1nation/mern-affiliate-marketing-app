import React from 'react';
import { connect } from 'react-redux';
import {slide as Menu} from 'react-burger-menu';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import './sidebar.css';
import {store } from '../store';
import {action as toggleMenu} from 'redux-burger-menu';
import {logout,loadUser} from '../action/auth';

import { Link,useNavigate } from 'react-router-dom';
const Sidebar = ({isOpen,logout,auth}) => {

    const navigate = useNavigate();
    
const onOpenHandle = () => {
    store.dispatch(toggleMenu(!isOpen,'user'));
}
const onCloseHandler = () => {
    store.dispatch(toggleMenu(!isOpen,'user'));
}

const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/')


}



return(

    <Menu right isOpen={isOpen} onOpen={onOpenHandle} onClose={onCloseHandler}  customBurgerIcon={false}>
        {
            auth.isAuthenticated ?
            <div>
           <p><Link to="/dashboard" className="menu-item"> Dashboard </Link></p> 
    <p><Link to="/profile" className="menu-item"> Profile </Link></p> 
    <p><Link to="/wallet" className="menu-item"> Wallet </Link></p>  
    <p> <Link to="/submit-grivances" className='menu-item'>Grivance</Link> </p>
    
        
    
        </div>:
        <Link to="/login" className="menu-item"> Login/Sign Up </Link>


        
        }
        <Link className="menu-item" to="#-us">About Us</Link>
        <Link className="menu-item" to="#">Contact Us</Link>
        
        
        {
            auth.isAuthenticated ?
            <p className="menu-item" to="#" onClick={(e)=>
                {handleLogout(e)}
            } style={{
                cursor: 'pointer'
            }} >< i className='fa fa-sign-out' > </i> Logout </p>:null
        }
        
        
    </Menu>    
);
}

const mapStateToProps = state => ({
    auth: state.auth,
    isOpen: state.burgerMenu.user.isOpen});

export default connect(mapStateToProps,{logout,loadUser})(reduxBurgerMenu(Sidebar,'user'));