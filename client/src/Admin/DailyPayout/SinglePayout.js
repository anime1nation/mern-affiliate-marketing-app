import React,{useEffect,Fragment} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import axios from 'axios';
import {useParams,Link} from 'react-router-dom'
import loader from '../../assets/image/loader.gif'
import {setAlert} from '../../action/alert';
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
const SinglePayout = () => {

    const {date} = useParams();
    const [payouts,setPayout] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    

    const fetchPayout = async () => {
        try{
            const res = await axios.get(`/api/admin/daily-payout/${date}`);
            setPayout(res.data);
            setLoading(false);
            
        }catch(err){
            console.log(err);
            setAlert('Payout Load Failed','danger');
        }
    }

    
    

    useEffect(() => {
      fetchPayout();
    }, [])
    

  return (
    

    <div className='container-fluid' style={{
        padding:'0',
    }}>
        <AdminSidebar />
        <div className='row' style={{
            padding:'0'
        }}>
            <AdminNavbar /> 
        </div>
        {
    loading && payouts===undefined  ? 
    <div className='row'>
        <div className='col-md-12'>
            <img src={loader} alt='loader' className='loader' style={{
                top: '30%',
                    left: '40%',
            }} />
            <h5 style={{
                top: '40%',
                 left: '40%',
            }}>Loading Please Wait....</h5>
        </div>
    </div>        
    :
       <SimpleBar style={{
           maxHeight:'800px',
           
       }} >
            <div className='row'>
            <div className='col-sm-6'> <Link to='/admin/daily-payout' ><i className="fa-solid fa-left-long fa-3x"  ></i></Link> </div>
             {  
                payouts.map(payout => (



            <div className='col-sm-12' key={payout._id} >
                    
                        {
                           payout.dayEarning.filter(earning=> earning.earningDate === date).map(earning => (
                            !earning._id ? <h4>No Pending Transaction </h4> :
                        <Fragment>    
                            <div className='card shadow-lg' style={{
                                borderRadius:'20px'
                            }}>
                    <div className='row card-body'>
                
                        <div className='col-sm-8'>
                            <p> User ID : {payout.referId} </p>
                            <p> User Name : {payout.name}  </p>
                            <p> Account No : {payout.bankDetails.accountNo} </p>
                            <p> IFSC  : {payout.bankDetails.ifsc} </p>
                            <p> UPI ID: {payout.bankDetails.upiId} </p>
                        </div>
                                      
                        <div className='col-sm-4' key={earning._id}>
                            <p>1st Level Earning : {earning.firstGenDayEarning} </p>
                            <p>2nd Level Earning : {earning.secondGenDayEarning} </p>
                            <p>3rd Level Earning : {earning.thirdGenDayEarning } </p>
                            <p>Total Earning : {earning.firstGenDayEarning + earning.secondGenDayEarning +earning.thirdGenDayEarning}</p>
                            <p> Status  :{ earning.isApproved ? 'Approved' : earning.isDeclined ? 'Declined':'Pending' }</p>
                        </div> 
                        
                        <div className='col-sm-6 mt-3'> <button className='btn btn-lg red' onClick={
                            async () => {
                                try{
                                    const res = await axios.post(`/api/admin/decline-daily-payout/${payout._id}/${date}`);
                                    setAlert('Payout Reject','success');
                                    fetchPayout();
                                }catch(err){
                                    setAlert('Server Error','danger');
                                }
                            }
                        } disabled={earning.isApproved || earning.isDeclined} > Reject Payment </button></div>  
                        <div className='col-sm-6 mt-3 text-center'> <button className='btn btn-lg green' onClick={
                            async () => {
                                try{
                                    const res = await axios.post(`/api/admin/approve-daily-payout/${payout._id}/${date}`);
                                    setAlert('Payout Approved','success');
                                    fetchPayout();
                                }catch(err){
                                    setAlert('Server Error','danger');
                                }
                            }
                        } disabled={earning.isApproved || earning.isDeclined} > Approve Payment </button> </div>   
                        </div>   
                </div> 
                        </Fragment> ))
                            
                        
}

                     

            </div>   ))
            
             }
        </div>
       </SimpleBar> 


        
}
     </div>
  )
}

export default SinglePayout