import React from 'react';
import r1 from '../../assets/image/r1.png';
import r2 from '../../assets/image/r2.png';
import r3 from '../../assets/image/r3.png';
import r4 from '../../assets/image/r4.png';
import r5 from '../../assets/image/r5.png';
import r6 from '../../assets/image/r6.png';
import './rewrdCard.css';

const RewardCard = () => {
    return(
        <div className='col-sm-12 shadow mx-auto reward-img-box' style={{
            width:'80%',
            backgroundColor: '#F56812',
            borderRadius: '10px'
        }}>
            <div className='row mx-auto'>
                <div className='col-sm-12 text-center'>
                <h5 className='text-light'> Get a chance to win exciting gift hampers <sup>*</sup> </h5>
                </div>
            </div>    
            <div className='row text-center  reward-img-box'>
                <div className='col-sm-4'>
                    <img src={r1} alt="r1" className="img-fluid reward-img"/> 
                </div>

                <div className='col-sm-4'>
                    <img src={r2} alt="r1" className="img-fluid reward-img"/> 
                </div>

                <div className='col-sm-4'>
                    <img src={r3} alt="r1" className="img-fluid reward-img"/> 
                </div>
            
            </div>
            <div className='row text-center pb-4'>
                <div className='col-sm-4'>
                    <img src={r4} alt="r1" className="img-fluid reward-img"/> 
                </div>

                <div className='col-sm-4'>
                    <img src={r5} alt="r1" className="img-fluid reward-img"/> 
                </div>

                <div className='col-sm-4'>
                    <img src={r6} alt="r1" className="img-fluid reward-img"/> 
                </div>
            
            </div>


            <div className='row'>
                <div className='col-sm-12 text-center'>
                    
                    <h6>* T&C applid : Valid for first month of joining</h6>
                </div>    
            </div>


        </div>
    )

}

export  default RewardCard;
