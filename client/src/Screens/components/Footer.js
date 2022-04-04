import React,{Fragment} from 'react';
import  logo from '../../assets/image/logo.png';
import {  } from '@fortawesome/free-solid-svg-icons';

import './footer.css';

const Footer = () => {
    return (
        <Fragment>
                <div className="row footer-box" style={{
                backgroundColor: '#022140',
                padding:'0',
                marginBottom:'0',
                margin:'0'
            }}>
                    <div className="col-sm-4 footer-box-logo ">
                        <img src={logo} alt="logo"  className="logo img-fluid"
                        style={{
                            width: '120px',
                            height: '120px',
                        }}
                        />
                        <p className="mt-3 text-light ml-2 footer-box-address">
                            FX-BROKERAGE LTD</p>
                            <span className="footer-box-address-span mx-2">
                                <i className="fa-solid fa-envelope mr-2"></i>
                               support@fxbrokeragebusiness.com
                            </span>  
                        
                    </div>
                    <div className="col-sm-4 footer-social-icon text-center">
                        <ul style={{
                            listStyleType: 'none',
                        }} className=' mt-4' >
                            <li className='mt-2'>
                                <a href="#">
                                <i className="fa-brands fa-facebook text-light"></i>
                                </a>
                            </li>
                            <li className='mt-2'>
                                <a href="#"> 
                                <i className="fa-brands fa-twitter text-light"></i>
                                </a>
                            </li>
                            <li className='mt-2'>
                                <a href='https://instagram.com/fxbrokerage2022?utm_medium=copy_link' target='_blank'>
                                <i className="fa-brands fa-instagram text-light"></i>
                                </a>
                                </li>    
                            <li className='mt-2'>
                                <a href="#"> 
                                    <i className='fa-brands fa-linkedin text-light'></i>
                                </a>
                            </li>   
                            <li className='mt-2'>
                                <a href="#">
                                    <i className='fa-brands fa-whatsapp text-light'></i>
                                </a>
                                </li> 
                        </ul>
                     </div>  

                    <div className="col-sm-4 text-center "
                        style={{
                            verticalAlign: 'middle',
                        }}
                    >
                        <h1 style={{
                            color: '#fff',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            fontSize:'30px',
                            marginTop: '8%',
                        }}>Either You can have excusses or  you can have money
                            </h1>  
                    </div>        
                </div>

              <div className="row footer-box-bottom" style={{
                backgroundColor: '#022140',
              }}>
                   <div className="col-sm-12 text-center  text-light">
                       <p> Copyright © 2022 FX-Brokerage. All rights reserved. </p>
                              

                    </div>
               </div>        
    </Fragment>       
            

                            );
    }

 export default Footer;                           