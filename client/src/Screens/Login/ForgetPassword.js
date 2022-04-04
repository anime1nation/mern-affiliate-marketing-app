import React,{useState} from 'react'
import bg from '../../assets/image/bg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft, faBackward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setAlert } from '../../action/alert';
import { connect } from 'react-redux';
import Alerts from '../../Components/Alerts';
import { useNavigate } from 'react-router-dom';
import {forgetPasSendOtp} from '../../action/auth';
import {FORGET_PASSWORD_OTP_SENT,FORGET_PASSWORD_OTP_SENT_FAIL} from '../../action/types'
import {store} from '../../store';
const ForgetPassword = ({
    setAlert,isAuthenticated,isOtpSent,otp,forgetPasSendOtp
}) => {


    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        mobile:'',
        username:'',

    }); 

    const [passwordData,setPasswordData]=useState({
        password:'',
        confirmPassword:'',
    });

    //generate 6 digit otp
    const generateOtp = () =>{
        //generate 6 digit otp
           let otp = Math.floor(100000 + Math.random() * 900000);
           return otp;
       }
    

    const [userOtp,setUserOtp]=useState('');
    const [isOtpVerified,setIsOtpVerified]=useState(false);
    const [isPasswordChanged,setIsPasswordChanged]=useState(false);

    const {mobile,username}=formData
    const {password,confirmPassword}=passwordData


    const onChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onPasswordChange = (e)=>{
        setPasswordData({...passwordData,[e.target.name]:e.target.value});
    }

    const onOTPChnage=(e)=>{
        setUserOtp(e.target.value);
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        if(username===''|| mobile===''){
            setAlert('Please enter mobile number and username','danger')
        }
        else{
        try{
            
            const sentOtp = generateOtp();
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const body = JSON.stringify({
                username,mobile,otp:sentOtp
            });
            const res = await axios.post('/api/user/forget-password-otp/',body,config);
            store.dispatch({
                type:FORGET_PASSWORD_OTP_SENT,
                payload:res.data
            });

        }catch(err){
            console.log(err.message);
            const errors=err.response.data.errors;
            if(errors){
                errors.forEach(error=>setAlert(error.msg,'danger'));
            }
            store.dispatch({
                type:FORGET_PASSWORD_OTP_SENT_FAIL,
                
            });
        }
        }
    }


    const  onVerifyOtp = (e)=>{
        if(!userOtp){
            setAlert('Please Enter OTP','danger');
        }else{
            if(userOtp==otp.otp){
                setIsOtpVerified(true);
            }else{
                setAlert('Invalid OTP','danger');
                
            }
        }
    }

    const onPasswordSubmit = async(e)=>{
        if(password!==confirmPassword){
            setAlert('Please Enter Same Password','danger');
        }
        else{
            try{

                const config={
                    headers:{
                        'Content-type':'application/json'
                    }
                }
                const body ={
                    username,mobile,password
                }
                const res = await axios.post('/api/user/forget-password/',body,config);
                if(res.data){
                    setAlert('Password has been chnaged,Please login now .','success')
                }
    
    
                setTimeout( ()=>{
                        navigate('/login')
                },1200)
    
    
            }catch(err){
                const errors=err.response.data.errors;
                if(errors){
                    errors.forEach(error=>setAlert(error.msg,'danger'));
                }
            }
        }
    }


    if(isAuthenticated){
        navigate('/');
    }

  return (
    
    <div className='container-fluid 'style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>
        <div className='row' >
            <div className='col-sm-4 offset-6' style={{
            marginTop:'5%'
        }}>
            <div className='col-sm-12'>
                <Alerts />
            </div>


                <div className='card text-light' style={{
                    backdropFilter: 'blur(16px) saturate(180%)',
                    backgroundColor: 'rgba(17, 25, 40, 0.75)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                    paddingBottom:'2rem'
                }}>
                    <span><FontAwesomeIcon icon={faArrowAltCircleLeft} size={'2x'} className='text-light m-2'/></span>
                    <h5 className='text-center'>Forget Password</h5>
                    <div className='card-body' style={
                        {
                            paddingTop:'20%',
                            paddingBottom:'20%'
                        }
                    }>
                        {
                        !isOtpSent?               
                        <div>
                            <div className='form-group'>
                                <label htmlFor='userid'>User Name</label>
                                <input type='text' className='validate text-light' id='userid' value={username}  onChange={e=>{
                                    onChange(e)
                                }} name='username'placeholder='Enter User Name' />
                             </div>   
                             <div className='form-group'>
                                <label htmlFor='mobile'>mobile</label>
                                <input type='text' className='validate text-light' id='mobile' value={mobile}  onChange={e=>{
                                    onChange(e)
                                }}  name='mobile' placeholder='Enter Mobile' />
                             </div>   
                                <div className='form-group text-center mt-5'>
                                <button className='btn col-sm-6' style={{
                                  backgroundColor: '#F56812',
                                  borderRadius:'25px'
                              }} onClick={e=>{
                                  onSubmitHandler(e)
                              }} > Submit</button>
                                  </div>  


                            
                        </div>:
                            
                                isOtpVerified ? <div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className='validate text-light' id='password' value={password}  onChange={e=>{
                                        onPasswordChange(e)
                                    }} name='password'placeholder='Enter Password' />
                                 </div>   
                                 <div className='form-group'>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                    <input type='password' className='validate text-light' id='cnfPassword' value={confirmPassword} onChange={e=>[
                                        onPasswordChange(e)
                                    ]}  name='confirmPassword'placeholder='Confirm Password' />
                                 </div>   
                                    <div className='form-group text-center mt-5'>
                                    <button className='btn col-sm-6' style={{
                                      backgroundColor: '#F56812',
                                      borderRadius:'25px'
                                  }} onClick={e=>{
                                    onPasswordSubmit(e)
                                  }} >Change Paaword</button>
                                      </div>  
    
    
                                
                            </div>
    :<div>
      
     <div className='form-group'>
        <label htmlFor='mobile'>OTP</label>
        <input type='text' className='validate text-light' id='otp'  value={userOtp} onChange={e=>{
            onOTPChnage(e)
        }}   name='userOtp'placeholder='Enter OTP' />
     </div>   
        <div className='form-group text-center mt-5'>
        <button className='btn col-sm-6' style={{
          backgroundColor: '#F56812',
          borderRadius:'25px'
      }} onClick={e=>{
          onVerifyOtp(e)
      }} > Verify OTP</button>
          </div>  


    
</div>

                                
                            
                        

                        }
                        </div>
                       </div> 


            </div>
        </div>    
    </div>
  )
}

const mapStateToProps = state =>{
    return {
        isAuthenticated:state.auth.isAuthenticated,
        isOtpSent :state.auth.isOtpSent,
        otp:state.auth.otp

    }
}

export default connect(mapStateToProps,{setAlert,forgetPasSendOtp})(ForgetPassword);