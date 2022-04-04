import React,{Fragment, useEffect,useRef,useState} from 'react';
import UserNavbar from '../Wallet/UserNavbar';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {enroll} from '../../action/user';
import {loadUser} from '../../action/auth';
import { setAlert } from '../../action/alert';
import Alerts  from '../../Components/Alerts';
import { Link, useNavigate } from 'react-router-dom';
import loader from '../../assets/image/loader.gif';

const Enrollment = ({
    auth:{ user,isAuthenticated },
    enroll, 
    loadUser,setAlert
}) => {




    const[wallet,setWallet]=useState({});
    const[isEnrolled,setIsEnrolled]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const navigate = useNavigate();


    const [formData, setFormData] = React.useState({
        name: '',
        username: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        referalId: '',
        refralName: '',
        uplinkId:null,
        dob:'',
        pin: '',
        enrollPackage: ''
    });

    const {name, username, email, password, address1, address2, referalId,pin,enrollPackage ,refralName,uplinkId,dob} = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        
    }

    const isUserEnrolled = async () => {
        try{
            const res = await axios.get(`/api/user/isEnrolled/`);
            if(res.data.isEnrolled){
                setIsEnrolled(true);
            }
            else{
                setIsEnrolled(false);
            }
            setIsLoading(false);
        }catch(err){

        }
    }

    const onReferalIdBlur = async(e) => {
        if(referalId !== '' && referalId !== null && referalId !== undefined ){
            try{
                fetchName();
               
            }catch(err){
                console.log(err);
                setAlert('Referal Id is not valid', 'danger');
            }
        }
    }



    const fetchName = async() =>{
        try {
            const res =  await axios.get(`api/user/uplink-name/${referalId}`);
           
            if(res.data.uplink.isAdminBlocked){
                setAlert('This user has been blocked. Please use any other referal ID','danger')

                setFormData({...formData,referalId:'',refralName:''});
            }
            
            else{
                setFormData({...formData, refralName: res.data.uplink.name, uplinkId: res.data.uplink._id});
            }

        } catch (error) {
            console.log(error.message);
            setAlert('Referal Id is not valid', 'danger');
        }
    }

        
    const getWallet = async() =>{
        try{
            const res = await axios.get('/api/user/get-wallet-deatils');

            setWallet(res.data);
            if(wallet.amount===1199){
                    setFormData({...formData,enrollPackage:'silver'})
            }else{
                setFormData({...formData,enrollPackage:'gold'})
            }
        }catch(err){
            console.log(err.message);
            
        }
    }

 

    
  let isMounted = useRef(false);
  
        
    useEffect(() => {
        isMounted=true;
        
        loadUser();
       
        
            if (isMounted) {
               
               isUserEnrolled(); 
               getWallet();
                
            }
            
      
          return () => {
            isMounted = false;
          };
        
    }, []);

    

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            
            enroll({
                
                referalId,
                uplinkId,
                name,
                address1,
                address2,
                dob,
                password,
                email,
                username,
                
            })

            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        }catch(err){
            console.log(err.message);
        }
    }
  return (
    <Fragment>
        {
            isLoading ?
            <div className="loader-container">
                <img src={loader} alt="loader" className="loader"/>
            </div>:
            <div className='conatiner-fluid' style={{
                backgroundColor: '#F56812',
            }}>
                <div className='row'>
                    <UserNavbar />
                </div>
        
                <div className='row mt-5 px-5 justify-content-center'>
                    <Alerts />
                    <div className='col-sm-12'>
                            <div className='card shadow-md' style={{
                                border:'1px solid #fff',
                                borderRadius:'10px'
        
                            }}>
                                {
                                    user.isEnrolled ?
                                    <div className='card-body mb-5 text-center'>
                                        <h5 className='text-center'>You are already enrolled  <i className='fa fa-check text-green'></i>  </h5>
                                        <strong>Go to  <Link to='/dashboard' > Dashboard  </Link>  </strong>
                                    </div>
                                    :
        
                                <div className='card-body'>
                                    <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className="input-group input-group-sm mb-3">
                                            <label className=""  htmlFor="refralId">Referal Id</label>
                                            <input type="text" className="form-control" name='referalId' value={referalId} onBlur={ e=>{onReferalIdBlur(e)}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e=>{
                                                onChange(e);
                                            }}  />
                                        </div>
                                            

                                           
                                        <div className="input-group input-group-sm mb-3">
                                            <label className=""  htmlFor="username">User Name</label>
                                            <input type="text" className="form-control" name='username' aria-label="Small" aria-describedby="inputGroup-sizing-sm"  onChange={e=>{
                                                onChange(e);
                                            }} />
                                        </div>
        
                                        <div className="input-group input-group-sm mb-3">
                                            <label className=""  htmlFor="name">Name</label>
                                            <input type="text" className="form-control" name='name'  value={name}aria-label="Small" aria-describedby="inputGroup-sizing-sm"onChange={e=>{
                                                onChange(e);
                                            }} />
                                        </div>
        
                                        
                                        <div className="input-group input-group-sm mb-3">
                                            <label className=""  htmlFor="address1">Address</label>
                                            
                                            <input type="text" className="form-control" name='address1' value={address1} aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e=>{
                                                onChange(e);
                                            }}  />
                                            
                                            <input type="text" className="form-control" name='address2' value={address2} aria-label="Small" aria-describedby="inputGroup-sizing-sm"  onChange={e=>{
                                                onChange(e);
                                            }} />
                                        </div>
        
                                        <div className="input-group input-group-sm mb-3">
                                            
                                            <input type="text" className="form-control" name='pin' value={pin} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder='Pincode' onChange={e=>{
                                                onChange(e);
                                            }} />
                                        </div>
        
                                        
        
                                    </div>
        
                                    <div className='col-sm-6'>
                                        <div className="input-group  mb-3">
                                            <label className=""  htmlFor="refralName">Referal Name</label>
                                            <input type="text" className="form-control" name='refralName' value={refralName} aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e=>{
                                                onChange(e);
                                            }} readOnly={true} />
                                        </div>

                                        <div className="input-group  mb-3">
                                            <label className=""  htmlFor="refralName">Date of Birth</label>
                                            <input type="text" className="form-control" placeholder='YYYY-MM-DD' name='dob' value={dob} aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e=>{
                                                onChange(e);
                                            }} readOnly={true} />
                                        </div>
        
                                        
        
                                        <div className="input-group input-group-sm mb-3">
                                            
                                                <label className=""  htmlFor="password">Password</label>
                                            <input type="password" className="form-control" value={password} onChange={e=>{
                                                onChange(e);
                                            }} name='password' aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
        
                                        
                                        
                                        <div className="input-group input-group-sm mb-3">
                                            <label className=""  htmlFor="email">Email</label>
                                            <input type="text" className="form-control" name='email' value={email} onChange={e=>{
                                                onChange(e);
                                            }}  aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </div>
        
                                        
                                       
        
                                        
        
        
                                    </div>
                                    </div>
                                  <div className='row'>
                                  <div className='col-sm-3 offset-md-4 offset-sm-0'>
                                      <button className='btn btn-block ' style={{
                                          backgroundColor: '#F56812',
                                          borderRadius:'25px'
                                      }} onClick={e=>{
                                            onSubmit(e);
                                      }}> Enroll Now</button>
                                 </div> 
                                  </div> 
                                </div>
        
                                    }
        
                            </div>
                    </div>
                </div>  
        
              <Footer />                        
            </div>
        }
    </Fragment>

  )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps,{enroll,loadUser,setAlert})(Enrollment);