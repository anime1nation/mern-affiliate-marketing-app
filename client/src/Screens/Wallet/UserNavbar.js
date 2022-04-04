import React, { Fragment,useEffect,useState } from "react";
import  icon from '../../assets/image/icon.png';
import './userNavbar.css';
import { Link,Navigate} from 'react-router-dom';
import { faBars,faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {action as toggleMenu} from 'redux-burger-menu';
import {store } from '../../store';
import {connect} from 'react-redux';
import axios from 'axios';
import {loadUser} from '../../action/auth'
const UserNavbar = ({
    auth,
    isOpen,
    loadUser
    
}) => {

    const [user,setUser]=React.useState({});
    const fetchUser =  async() => {
        try{
            const res = await axios.get('/api/auth');
            setUser(res.data);

        }catch(err){
            console.log(err.message);

        }
    }

    useEffect (() => {
        if(!auth.isAuthenticate){
            if(localStorage.getItem('token')){
                loadUser()
            }else{
                Navigate('/login');
            }
        }
        fetchUser();
        return () => {
            setUser({});
        }
    }, []);
     const handleToggle = () => {
            
            store.dispatch(toggleMenu(!isOpen,'user'));

     }

    return (

        <Fragment>
            <div className="col-3">
                <img src={icon} alt="logo" style={{
                    height: '5rem',
                    width: '5rem'
                }} />
            </div>
            <div className="col-9 text-right">
                <ul className="leftNav mt-3">
                    <li>
                        <Link to='/profile' className="text-light listItem"> {user.name && user.name} </Link>
                    </li>
                    <li> <Link to='/wallet' className="text-light listItem"><FontAwesomeIcon icon={faWallet} /></Link> </li>
                    <li> <a  className="text-light listItem" onClick={
                        handleToggle
                    }><FontAwesomeIcon icon={faBars} /></a> </li>    
                </ul>
            </div>
        </Fragment>
    );
    }

    const mapStateToProps = state => ({
        auth: state.auth,
        isOpen: state.burgerMenu.user.isOpen});
export default connect(mapStateToProps,{loadUser})(UserNavbar);    