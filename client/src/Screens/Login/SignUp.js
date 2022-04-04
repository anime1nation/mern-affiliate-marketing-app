import React, { Fragment,useState,useEffect } from "react";
import { connect } from "react-redux";
import {loadUser, sendOtp,signUp} from '../../action/auth';

import { setAlert } from "../../action/alert";
import Alerts from '../../Components/Alerts';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = ({
signUp,sendOtp,auth:{isAuthenticated,loading,isOtpSent,otp},setAlert
}) => {

    const[formData,setFormData]=useState({
        name:'',
        mobile:'',
        userotp:''});   
    const {
        name,
        mobile,
        userotp
    } = formData;
    
    const navigate=useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            loadUser();
        }else{
            if(isAuthenticated){
                navigate('/')
            }
        }
    }, []);
    
    
    
    const generateOtp = () =>{
     //generate 6 digit otp
        let otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }


    const onChangeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
        

}
const onRegister = async(e)=>{
    e.preventDefault();
    const otp = generateOtp();
    
    try{
        

        const res = await axios.get(`/api/auth/check/${mobile}`);
        
        if(res.data){
            setAlert('User with this mobile number alredy enrolled','danger');
        }
        else{
            
        sendOtp({
            name,
            mobile,
            otp
        });
        
        }
         
    }catch(err){
        console.log(err.message);
    }

}

const onVerify = (e) => {
    e.preventDefault();

    if(formData.userotp==otp.otp){
        try{
            signUp({
                name,
                mobile
            });
            navigate('/');
        }catch(err){
            console.log(err.message);
        }
    }else{
        setAlert('Invalid Otp','danger');
    }
}



    return (
        <Fragment>
             <div className='card-header text-center' style={{
                        borderBottom:0,
                    }}>
                    <h3 style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '2em',
                        color: '#00bcd4',
                        textTransform: 'uppercase',
                    }}>Sign Up</h3>
                    </div>    
                    <div className="card-body mx-auto col-sm-12">

                        <form>
                
                            <div className="input-container">
                                <input type="text" required="" className='validate' name='name' value={name}  onChange={(e)=>{
                                    onChangeHandler(e);
                                }} />
                                <label style={{
                                    fontSize: '1.2em',
                                }}>Name</label>		
                            </div>
                            <div className="input-container">		
                                <input type="text" required="" className='validate' name='mobile' value={mobile} onChange={(e)=>{
                                    onChangeHandler(e);
                                }} maxLength={10} minLength={10}/>
                                <label style={{
                                    fontSize: '1.2em',
                                }}>Mobile No.</label>
                            </div>
                            
                            <div className="form-group form-check mt-2">
                                <input type="checkbox" className="form-check-input" id="remember"/>
                                <label className="form-check-label text-light" htmlFor="remember">Remember me</label>
                            </div>
                            <div className='text-center mt-5'>
                            
                            <button type="submit" className='waves-effect waves-light btn deep-orange daken-1'  style={{
                                background: '#F56812 0% 0% no-repeat padding-box',
                                borderRadius: '43px',
                                width: '200px',
                                height: '45px',
                                opacity: '1'
                            }} onClick={(e)=>{
                                onRegister(e);
                            }} >Register</button>
                            </div>
                        </form>
                        <form>
                      {isOtpSent ? 
                          <Fragment>   
                           
                        <div className="input-container text-center">		
                                <input type="text" required="" name='userotp' className='validate' maxLength={10} minLength={10} style={{
                                    width: '80%',
                                    justifyContent: 'center',
                                }} value={userotp} onChange={(e)=>{
                                    onChangeHandler(e);
                                }} />
                        </div>

                        <div className='text-center mt-5'>
                        <button type="submit" className='waves-effect waves-light btn indigo daken-1'
                        style={{
                            borderRadius: '43px',
                            width: '180px',
                            height: '45px',
                            opacity: '1'
                        }}
                        onClick={(e)=>{
                            onVerify(e);
                        }}
                        > VERIFY </button>
                        </div>    

                        </Fragment> : null }
                        </form>    

                   </div>
        </Fragment>
    )

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{sendOtp,setAlert,signUp})(SignUp);