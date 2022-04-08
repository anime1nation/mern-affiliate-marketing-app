import React from 'react';
import { connect } from 'react-redux';
import {slide as Menu} from 'react-burger-menu';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {store } from '../../store';
import {action as toggleMenu} from 'redux-burger-menu';
import { Link,useNavigate } from 'react-router-dom';
import {AdminLogOut, loadAdmin} from '../../action/admin';

const AdminSidebar = ({isOpen,AdminLogOut,isAuthenticated}) => {


    const navigate = useNavigate();
    
const onOpenHandle = () => {
    store.dispatch(toggleMenu(!isOpen,'admin'));
}
const onCloseHandler = () => {
    store.dispatch(toggleMenu(!isOpen,'admin'));
}

const handleLogout = () =>{
    try{
        AdminLogOut();
        navigate('/admin/login');
    }catch(err){
        console.log(err);
    }
}

if(!isAuthenticated){
    navigate('/admin/login');
}



return(

    <Menu  isOpen={isOpen} onOpen={onOpenHandle} onClose={onCloseHandler}  customBurgerIcon={false}>
        <Link className="menu-item" to="/admin">Verified Users</Link>
        <Link className="menu-item" to="/admin/registered-users">Registered Users</Link>
        <Link className="menu-item" to="/admin/pending-wallet-request">Wallet Request</Link>
        <Link className="menu-item" to="/admin/daily-payout">Daily Payout Detail</Link>
        <Link className="menu-item" to="/admin/kyc-request"> Pending KYC Request </Link>
        <Link className='meni-item' to='/admin/grivances'>Grivances</Link>
        <Link className="menu-item" to="/admin/notice">Notice</Link>
        <Link className="menu-item" to="/admin/classes">Schedule Classes</Link>
        <Link className='menu-item' to='/admin/add-testimonial'>Add Testimonial </Link>
        <Link className="menu-item" to="#">< i className='fa fa-sign-out' onClick={e=>{
            handleLogout(e)
        }} > </i> Logout </Link>
        
    </Menu>    
);
}

const mapStateToProps = state => ({
    isAuthenticated: state.adminAuth.isAuthenticated,
    isOpen: state.burgerMenu.admin.isOpen});

export default connect(mapStateToProps,{AdminLogOut})(reduxBurgerMenu(AdminSidebar,'admin'));