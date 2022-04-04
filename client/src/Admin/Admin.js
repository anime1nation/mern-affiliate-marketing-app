import React, { Fragment, useEffect } from 'react'
import {Route, Routes} from 'react-router';
import {BrowserRouter as Router,withRouter} from 'react-router-dom';
import UserInfo from './UserInfo/UserInfo'
import AdminNavbar from './Components/AdminNavbar';
import AdminSidebar from './Components/AdminSidebar';
import {connect} from 'react-redux';
import { loadAdmin } from '../action/admin';
import { useNavigate } from 'react-router-dom';
const Admin = ({
  isAuthenticated,loadAdmin
}) => {

  useEffect(() => {
    loadAdmin();

  },[]);
  const navigate = useNavigate();
  if(!isAuthenticated){

  navigate('/admin/login');

  }
  return (
    <Fragment>
      <AdminSidebar />
      <AdminNavbar />
      
    <UserInfo />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated:state.adminAuth.isAuthenticated
});
export default connect(mapStateToProps,{loadAdmin})(Admin);