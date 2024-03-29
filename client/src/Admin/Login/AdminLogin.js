import React,{useEffect,useState} from 'react';
import './login.css';
import {connect} from 'react-redux';
import {loadAdmin, loginAdmin} from '../../action/admin';
import {useNavigate,Navigate} from 'react-router-dom';
import Alerts from '../../Components/Alerts';
const AdminLogin = ({isAuthenticated,admin,loginAdmin,loadAdmin}) => {

  const navigate= useNavigate();

  const[formData,setFromData] = useState({
    username:'',
    password:''
  })

  const onChangeHandler = e =>{
    setFromData({...formData, [e.target.name]:e.target.value});
  }

  const {username,password}=formData

  const onSubmitHandler = (e) =>{
    e.preventDefault();
    console.log(formData);
    try{
      loginAdmin({username,password});
      setTimeout(() => {
        if(isAuthenticated && admin){
          navigate('/admin');
        }},1000 ) 
    }catch(err){
      console.log(err.message);
      alert('Login Failed');
    }
  }

  

  useEffect(() => {
    if(localStorage.adminToken){
      loadAdmin();
    }
    if(isAuthenticated && admin){
      navigate('/admin');
    }
  },[]);

  if(isAuthenticated && admin){
    navigate('/admin');
  }


  return (
    <div className="uf-form-signin">
    <div className="text-center">
      <Alerts />
    <h1 className="text-dark h3">Account Login</h1>
    </div>
    <div className="mt-4">
      <div className="input-group uf-input-group input-group-lg mb-3">
        <span className="input-group-text fa fa-user"></span>
        <input type="text" name="username"  value={username} onChange={e=>{
          onChangeHandler(e);
        }} className="form-control" placeholder="Username" />
      </div>
      <div className="input-group uf-input-group input-group-lg mb-3">
        <span className="input-group-text fa fa-lock"></span>
        <input type="password" name="password"  value={password} onChange={e=>{
          onChangeHandler(e);
        }} className="form-control" placeholder="Password" />
      </div>
      <div className="d-flex mb-3 justify-content-between">
        <div className="form-check">
          <input type="checkbox" className="form-check-input uf-form-check-input" id="exampleCheck1" />
          <label className="form-check-label text-white" htmlFor="exampleCheck1">Remember Me</label>
        </div>
        <a href="#">Forgot password?</a>
      </div>
      <div className="d-grid mb-4">
        <button  className="btn uf-btn-primary btn-lg" onClick={(e)=>{
          onSubmitHandler(e);
        }}>Login</button>
      </div>
      <div className="d-flex mb-3">
          <div className="dropdown-divider m-auto w-25"></div>
          <small className="text-nowrap text-white">Or login with</small>
          <div className="dropdown-divider m-auto w-25"></div>
      </div>
      <div className="uf-social-login d-flex justify-content-center">
        <a href="#" className="uf-social-ic" title="Login with Facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="uf-social-ic" title="Login with Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" className="uf-social-ic" title="Login with Google"><i className="fab fa-google"></i></a>
      </div>
      <div className="mt-4 text-center">
        <span className="text-white">Don't have an account?</span>
        <a href="register.html">Sign Up</a>
      </div>
    </div>
  </div>

  )
}

const  mapStateToProps = (state) => {
  return{
    isAuthenticated: state.adminAuth.isAuthenticated,
    admin: state.adminAuth.admin
  }
}


export default connect(mapStateToProps,{loginAdmin,loadAdmin})(AdminLogin);