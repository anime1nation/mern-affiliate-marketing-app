import React,{useEffect,useState,useRef} from 'react'
import { connect } from 'react-redux'
import avatar from '../../assets/image/avatar.png';
import './profileCard.css';
import axios from 'axios';
 const ProfileCard = ({username,userid,profileImg}) => {
    const [todayIncome,setTodayIncome]=useState('');

    const getTodayEarning = async () =>{
        try{
            const res = await axios.get('/api/user/today-earning');
           
            
            setTodayIncome(res.data.todayEarning);

             

        }catch(err){
            console.log(err.message);
            
        }
    }


    let isMounted = useRef(false);

    useEffect (() => {
        isMounted =true;
        if(isMounted){
            getTodayEarning();
        }
        return () => {
            isMounted=false;
        }
    }, []);
                


  return (
    <div className='col-md-3'>
        <div className='row' style={{
            padding:'0',
            margin:'0'
        }}>
            <div className='col-md-12'>
                <div className='card   bg-light text-center' style={
                    {
                        
                        borderRadius: '20px',

                    }
                }>   
                <div className='text-center'>
                    
                <img className='img-card-top profileCardImg' src={profileImg ? profileImg : avatar }  />
                </div>
                <div className='card-body'>
                    <h6 style={{
                        textTransform:'capitalize'
                    }}>
                        {username}
                    </h6>
                    <p>
                        {
                            `User Id: ${userid}`
                        }
                    </p>
                </div>
                </div>
             </div> 
        <div className='col-md-12'>
        <div className={`card shadow-md rounded text-center text-light`} style={{
            backgroundColor:"#14B534"
        }}>
            <h5>
                Today Income
            </h5>
            <h5>
                {todayIncome}
            </h5>
         </div>   
      
        </div>       
        </div>
    </div>

  )
}





export default ProfileCard;
