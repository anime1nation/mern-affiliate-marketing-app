import React,{useState,useEffect}   from 'react';
import axios from 'axios';
const TestimonialSingleCard = ({img,name,message}) => {



    return(
        <div className='card  shadow-lg' style={{
            width:'80%',
            marginLeft:'5%',
            border:'0px',
            backgroundColor:'#03030329',
        }}>
            <div className='card-img-top mx-auto text-center mt-3'>
                <img src={img} alt="logo " className='img-fluid' style={{
                    width: '10rem',
                    height: '10rem',
                    borderRadius:'50%'
                }} />    
            </div>    
            <div className='card-body text-center'>
                <h5>
                  { name  } 
                </h5>
                 <p>
                 <strong>"</strong>    {message} <strong>"</strong>
                </p>
            </div>    
        </div>
    )
}

export default TestimonialSingleCard;