import React,{useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../Wallet/UserNavbar';
import ProgressMeter from '../Home/ProgressMeter'
import DetailCardGroup from './DetailCardGroup';
import ProfileCard from './ProfileCard';
import ScheduleCard from './ScheduleCard';
import DownlineCard from './DownlineCard';
import RewardCard from '../Home/RewardCard';
import TestimonialCardGroup from '../Home/TestimonialCardGroup';
import Footer from '../components/Footer';
import incomeplan from '../../assets/image/incomeplan.png';
import axios from 'axios';
//actions
import { loadDashboard } from '../../action/dashboard';
import { loadDownline } from '../../action/dashboard';
import loader from '../../assets/image/loader.gif';
import {loadUser} from '../../action/auth';

const Dashboard = ({
    auth,
    loadUser,
    loadDashboard,
    loadDownline,
}) => {
    const navigate=useNavigate();

    const [userInfo,setUser]=React.useState({});
    const [isLoading,setIsLoading]=React.useState(true);
    
    


    const load = async () =>{
        try{
            const res = await axios.get('/api/auth');
            setUser(res.data);
            setIsLoading(false);

        }catch(err){
            setIsLoading(false);
            
        }
    }



    let isMounted = useRef(false);

    useEffect(() => {
        isMounted =true;
        
           if(isMounted){
            loadUser();
            
            load();
            if(!auth.isAuthenticated){
                navigate('/')
            }
           } 
 
    return () => {
        isMounted=false; 
    }
    }, []);
    
    

  return(
    isLoading && !userInfo ? 

    <div className='loader' style={{
        position:'absolute',
        left:'40%',
        top:'40%'
    }}>
        <img src={loader} />
        <p>Loading Please Wait ....</p>
    </div> :

      <div className='container-fluid' style={{
          padding:'0',
            margin:'0'
      }}>
          <div className='row' style={{
              backgroundColor:'#F56812',
              padding:'0',
              margin:'0'
          }}>
                <UserNavbar />
          </div>
          <div className='row mt-5 px-5'>
          <div className='col-sm-12'>
                    <ProgressMeter />
                    </div>
           </div>   
              
            <div className='row mt-5 px-5'>
                    <ProfileCard username={userInfo.name} profileImg={userInfo.profileImg} userid={userInfo.referId}  />
                    <DetailCardGroup user={userInfo}/>
                    <ScheduleCard />
            </div>  

            <div className='row mt-5 px-5'>
                    <DownlineCard   />
            </div>  
            <div className='row mt-5 px-5'>
                    <TestimonialCardGroup/>
            </div>
            <div className='row mt-5 px-5'>
                <RewardCard />
            </div>             
            
            <div className='row mx-auto mt-3 pb-3'>   
               <div className='col-sm-12'>
                   <img src={incomeplan} className='img-fluid' />
               </div>
            </div>

            <Footer />




       </div>   
          
  )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        dashboard : state.dashboard
    }

}
export default connect(mapStateToProps,{loadDashboard,loadUser})(Dashboard);
