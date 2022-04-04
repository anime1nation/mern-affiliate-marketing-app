import React, {useState, Fragment, useEffect } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProgressMeter = ({
    
}) => {

    const [step, setStep] = useState('');
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();
    const [btnLink,setBtnLink]=useState('');
    const [btnText,setBtnText]=useState('');



    

        const getStatus = async () =>{
            try{
                const res = await axios.get('/api/user/get-all-status');
                

                if(res.data.isWalletPaid){
                    if(res.data.isEnrolled){
                        if(res.data.isKYCApproved){
                            setStep('KYC Verified');
                            setPercentage(100);
                            
                        }
                        if(!res.data.isKYCApproved){
                            setStep('KYC Approval Pending');
                            setPercentage(75);
                            setBtnText('Go to Proifle');
                            setBtnLink('/profile');



                        }
                        if(!res.data.isKYCSubmitted){
                            setStep('Please Submit KYC details');
                            setPercentage(50);
                            setBtnLink('/profile');
                            setBtnText('Submit KYC Now');
                        }
                    }else{
                        setStep('Waiting for Enrollment');
                        setPercentage(50);
                        setBtnLink('/enroll')
                        setBtnText('Enroll Now')
                    }

                }else{
                    setStep('Please Pay the Wallet');
                    setPercentage(25);
                    setBtnLink('/wallet');
                    setBtnText('Pay Now');
                }


            }catch(err){
                console.log(err.message);
            }
        }

        useEffect(() => {

            let isMounted =true;
        
            setTimeout(() => {
                if(isMounted)
        {
           getStatus();
        }
    }, 1000);
        return () => {
            isMounted = false;
        }

        },[])


        



    return(
        <Fragment>
            <div className='card shadow-md'>
                <div className='card-body '>
                    <div className='row'>
                        <div className='col-sm-8'>
                        <h5>{ step }</h5>
                        
                    <ProgressBar
                        completed={percentage}
                        height={"20"}
                        bgColor='#06FF00'
                        labelColor='#000000'
                       animateOnRender={true} 
                        width="80%"/>
                    
                        </div>  
                    <div className='col-sm-4 text-center'>
                    {
                        btnLink!=='' ? 
                        <button className='btn btn-rounded btn-lg text-light'
                    style={{
                        backgroundColor: '#F56812',
                        borderRadius: '25px',
                        color: '#fff',
                        fontSize:'18px',
                        fontWeight:'600',
                        marginTop: '10%',
                        paddingBottom: '1rem',
                        verticalAlign: 'middle',
                        
                  }} onClick={
                    () => navigate(btnLink)
                  }> 
                    
                    { btnText }
                  
                  </button>:null
                    }
                    </div>              
                  </div>  
                </div>
            </div>
        </Fragment>
    )
}

export default ProgressMeter;