import React, { useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import HomeNavbar from '../components/HomeNavbar';
import  icon from '../../assets/image/icon.png';
import { Link,Navigate,useNavigate } from 'react-router-dom';
import { faBars,faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tagline from '../../assets/image/tagline.png';
import featurelist from '../../assets/image/featurelist.png';

import silverpackage from '../../assets/image/silverpackage.png';
import goldpackage from '../../assets/image/goldpackage.png';
import eligibility from '../../assets/image/eligibility.png';
import enrollment from '../../assets/image/enrollment.png';
import Footer from '../components/Footer';
import RewardCard from './RewardCard';
import TestimonialCardGroup from './TestimonialCardGroup';
import './home.css';
import checklist from '../../assets/image/checklist.png';
import animation from '../../assets/image/animation.gif';
import incomeplan from '../../assets/image/incomeplan.png';

import { loadUser } from '../../action/auth';
import {action as toggleMenu} from 'redux-burger-menu';
import { store } from '../../store';
import Notice from './Notice';
import moment from 'moment';
 const Home = ({
    loadUser,
    auth:{
        isAuthenticated,
        user
    },
    isOpen
 }) => {


     const handleToggle = () => {
            store.dispatch(toggleMenu(!isOpen,'user'));
     }

     const navigate=  useNavigate();




     let isMounted=useRef(false);



    useEffect(() => {
        
        isMounted =true;
        if(isMounted){
            if(localStorage.token){
                loadUser();
            }
        }
        return()=>{
            isMounted=false
        }
    }, []);

    if(isAuthenticated && user ){
        return <Navigate to='/home'/>;}

    
  return(
    <div className='container-fluid' style={{
        margin:0,
        padding:0,
    }}>
        
        
       <div className='row' style={{
           margin:0,
           padding:0
       }}>
            
            <div className='col-sm-6 col-xs-12 box1'>
                
                <div className='row' style={{
                    margin:0,
                    padding:0
                }}>
                    <div className='col-6'> 
                            <img src={icon} alt="logo" style={
                                { width: '80px', height: '80px' }
                            } className="logo"/>
                     </div>
                     <div className='col-6 mobile-icons'>
                     <ul className='d-flex flex-row-reverse '>
                    <li style={{listStyle:'none'}} className='mr-2'>
                            <a onClick={
                                handleToggle
                            } className='text-dark'>
                                <FontAwesomeIcon icon={faBars} /> 
                            </a>
                        </li>

                        <li className='mr-5' style={{listStyle:'none'}}>
                            <Link to='/login' className='text-dark'>
                                <FontAwesomeIcon icon={faWallet} /> 
                            </Link>
                        </li>

                       
                    </ul>
                      </div>   
                    <div className='col-sm-12 text-right'>
                        <img src={tagline} alt="tagline" className="img-fluid"/>
                        <Link to='/login'>
                        <button className='btn btn-rounded btn-lg mt-3 text-light' style={{
                            backgroundColor:'#F56812',
                            borderRadius:"25px",

                        }} > Join Now </button> </Link>
                    </div>    
                    <div className='col-sm-12 mt-5 text-center'>
                        <img src={featurelist} alt="featurelist" style={{
                            width: '50%',
                            height: 'auto'
                        }} className="img-fluid"/>
                    </div>
                </div>
                
                    
            </div>


            <div className='col-sm-6 col-xs-none box2'
            style={{
                backgroundColor:'#F56812',
            }}>
                <div className='row' style={{
                    padding:0,
                    margin:0
                }}>
                    <div className='col-sm-12 mt-3 pc-icons'>
                    <ul className='d-flex flex-row-reverse '>
                    <li style={{listStyle:'none'}} className='mr-2'>
                            <a onClick={
                                handleToggle
                            } className='text-light'>
                                <FontAwesomeIcon icon={faBars} /> 
                            </a>
                        </li>

                        <li className='mr-5' style={{listStyle:'none'}}>
                            <Link to='/login' className='text-light'>
                                <FontAwesomeIcon icon={faWallet} /> 
                            </Link>
                        </li>

                       
                    </ul>

                    </div>

                    <div className='col-sm-12 mt-5'>
                      <img src={animation} className='img-fluid'/>
                    </div>   

                    <div className='col-sm-12 mt-5'>
                        <h5 className='tagline-headng'>FX-Brokerage Provides :</h5>
                        <h6 className='tagline-para'><span>
                            <img src={checklist} alt="checklist" className='img-fluid mr-2' style={{
                                width: '20px',
                                height: '20px'
                            }}/>
                            </span>
                            Course that can help you to build a high-paying career as digital enterprenaur</h6> 
                        <h6 className='tagline-para' >
                        <span>
                            <img src={checklist} alt="checklist" className='img-fluid mr-2' style={{
                                width: '20px',
                                height: '20px'
                            }}/>
                            </span>
                            Platform to earn money by affliating our services to your business
                        </h6>
                    </div>  
            </div>


             </div>   
        </div>

        <div className='row'>
            <div className='col-sm-9 col-xs-12'>
                <img src={silverpackage} alt="logo" className='img-fluid' />


            </div>

            <div className='col-sm-3 col-xs-12 text-center mb-3'>
                <button className='btn btn-rounded btn-lg text-light btnSilverPack' onClick={e=>{
                    navigate('/login')
                }}> Enroll Now </button>
            </div>
        </div>

        <div className='row'>
        <div className='col-sm-3 col-xs-12 text-center'>
                <button className='btn btn-rounded btn-lg  text-light btnGoldPack' onClick={e=>{
                    navigate('/login')
                }} > Enroll Now </button>
            </div>
            <div className='col-sm-9 col-xs-12'>
                <img src={goldpackage} alt="logo" className='img-fluid' />
            </div>    

            <div className='col-sm-12 mt-1 text-center'>
            <button className='btn btn-rounded btn-lg text-light  btnGoldPack-alt' onClick={e=>{
                    navigate('/wallet')
                }} > Enroll Now </button>
            </div>
        </div>
         
         
         <div className='row mx-auto mt-3 pb-3'>
                    <RewardCard />
        </div>  

        
        <div className='row text-center mb-2'>
            <h5 className='col-sm-12 text-info text-center'><b>Testimonials</b></h5>
        </div>
        
        <div className='row'>
        
                <TestimonialCardGroup />                
        </div>       

        <div className='row mx-auto mt-3 pb-3'>   
               <div className='col-sm-12'>
                   <img src={incomeplan} className='img-fluid' />
               </div>
        </div>

        <div className='row'>
            <div className='col-sm-8 img-box'>
                <img src={eligibility} alt="logo" className='img-fluid '  />
                <img src={enrollment} alt="logo" className='img-fluid'  />
            </div>
            <div className='col-sm-4 mx-auto '>
                        <Notice />       
            </div>      
        </div>

        <Footer />
    </div>    
  )
  
        
                    
  
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    isOpen : state.burgerMenu.user.isOpen
});



export default connect(mapStateToProps, {loadUser})(Home);
