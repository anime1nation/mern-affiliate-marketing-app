import React from 'react';
import icon from '../../assets/image/icon.png';
import { connect } from 'react-redux';
import {store } from '../../store';
import {action as toggleMenu} from 'redux-burger-menu';
//import react-bootstrap
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
const AdminNavbar = ({isOpen,logout,isAuthenticated}) => {

    

    const handleToggle = () => {
        store.dispatch(toggleMenu(!isOpen,'admin'));
    }
    const navigate=useNavigate();

    if(!isAuthenticated){
        navigate('/admin/login');
    }
  return (

    
    <Fragment>
 
    
    <div className='col-sm-12' style={{
        backgroundColor: '#4DA0BF',
    }}>
        <div className='row '>
            <div className='col-6'>
                <a href='# ' className='text-dark'>
            <i className='fa fa-bars fa-2x mt-3'  onClick={handleToggle}></i> </a> 
            </div> 
            <div className='col-6 text-right'>
                     
                     <img src={icon} alt='icon' className='img-fluid' style={{
                        width: '4em',
                        height: '4em',
                    }}/> 
            </div>               
         </div>   
    </div>
    </Fragment>
  )
}


const mapStateToProps = state => ({
    isOpen: state.burgerMenu.admin.isOpen,
    isAuthenticated:state.adminAuth.isAuthenticated
});

export default connect(mapStateToProps,null)(AdminNavbar);
