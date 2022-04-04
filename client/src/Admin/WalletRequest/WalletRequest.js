import React,{Fragment,useState,useEffect} from 'react'
import AdminSidebar from  '../Components/AdminSidebar';
import AdminNavbar from '../Components/AdminNavbar';
import {connect} from 'react-redux';
import {loadWalletRequest} from '../../action/admin';
import axios from 'axios';
import loader from '../../assets/image/loader.gif';
import {setAlert} from '../../action/alert';
import Alerts from '../../Components/Alerts';
import './wallet.css';
import {action as toggleMenu} from 'redux-burger-menu';

const  WalletRequest = ({loadWalletRequest}) => {


    const[walletRequests,setWalletRequest] = useState([]);
    const[isLoading,setIsLoading] = useState(true);

    const fetchRequest = async () => {
        try{
            const res = await axios.get('/api/admin/wallet-request');
            setWalletRequest(res.data);
            setIsLoading(false);
        }catch(err){
            console.log(err);
        }

    }

            
    useEffect(() => {
        toggleMenu(false,'admin');
        fetchRequest();

    }, []);
  return (
      <Fragment>
          <AdminSidebar />
          
    <div className='container-fluid'>
        <div className='row'>
            <AdminNavbar />
            <Alerts />
         </div>  
{
    isLoading ? <div className='text-center'>
        <img src={loader} alt="loader" className="loader" />
        <p className='txt-wallet-card'  className='text-info'>Loading...</p ></div> :


         <div className='row'>
               {
                   walletRequests.length > 0 ? ( walletRequests.map(request => (
                    <Fragment key={request._id}>
                    <div className='col-md-12 mt-2' key={request._id}>
                          <div className='card' style={{
                              backgroundColor:'#00000029',
                              borderRadius:'10px'
                          }} >
                              
                              <div className='card-body'>
                                <div className='row'>
                              <div className='col-sm-8'>    
                                  <p className='txt-wallet-card' >Name :{request.name}</p >
                                  <p className='txt-wallet-card' > Mobile No.: {request.mobile}</p >
                                  <p className='txt-wallet-card' >Requested Amount : {request.wallet.amount}</p >
                                  <p className='txt-wallet-card' > UPI Id: {request.wallet.upiId}({request.wallet.upi})</p >
                                  
                                  <p className='txt-wallet-card' >City : {request.wallet.city}</p >
                                  <p className='txt-wallet-card' >State :{request.wallet.state}</p >
                                  <p className='txt-wallet-card' >Country :{request.wallet.country}</p >
                                  <p className='txt-wallet-card' >Remark:</p >
                                  <p className='txt-wallet-card'>{request.wallet.remarks}</p> 

                                  <div className='card-btn-pc text-left '>
                                  <button className='btn btn-success accept-btn btn-lg' onClick={ async (e)=>{
                                        e.preventDefault();
                                        try{
                                            const res = await axios.post(`/api/admin/approve-wallet/${request._id}`);
                                            
                                            setAlert(res.data.msg,'success');
                                            fetchRequest();

                                        }catch(err){
                                            console.log(err);
                                            setAlert('Server Error','danger');
                                        }
                                  }} >Accept</button>
                                    <button className='btn btn-danger reject-btn btn-lg' onClick={
                                        async (e)=>{
                                            e.preventDefault();
                                            try{
                                                const res = await axios.post(`/api/admin/reject-wallet/${request._id}`);
                                                
                                                setAlert(res.data.msg,'success');
                                                fetchRequest();
                                            }catch(err){
                                                console.log(err);
                                                setAlert('Server Error','danger');
                                            }
                                        }
                                    }>Reject</button>
                                  </div>
                                  
                              </div>


                              <div className='col-sm-4'>
                                    <img src={request.wallet.paySlip} alt='img-alt' className='img-fluid wallet-payslip' />
                             </div>



                             <div className='col-sm-12 card-btn-mobile text-center '>
                             <button className='btn btn-success accept-btn btn-lg' onClick={ async (e)=>{
                                        e.preventDefault();
                                        try{
                                            const res = await axios.post(`/api/admin/approve-wallet/${request._id}`);
                                            
                                            setAlert(res.data.msg,'success');
                                            fetchRequest();

                                        }catch(err){
                                            console.log(err);
                                            setAlert('Server Error','danger');
                                        }
                                  }} >Accept</button>
                                    <button className='btn btn-danger reject-btn btn-lg' onClick={
                                        async (e)=>{
                                            e.preventDefault();
                                            try{
                                                const res = await axios.post(`/api/admin/reject-wallet/${request._id}`);
                                                
                                                setAlert(res.data.msg,'success');
                                                fetchRequest();
                                            }catch(err){
                                                console.log(err);
                                                setAlert('Server Error','danger');
                                            }
                                        }
                                    }>Reject</button>

                             </div>

                             </div>


                              </div>
                                    
                          </div>
                      </div>
                      
                      </Fragment> 

                   ))):(
                          <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h4>No Request</h4>
                                    </div>
                                </div>
                          </div> )
}
         </div> 
           
}          
              
    </div>
    
    </Fragment>
  )
}
const mapStateToProps = state => ({
    auth: state.auth,
    isOpen: state.burgerMenu.admin.isOpen,

});

export default connect(mapStateToProps,{setAlert})(WalletRequest);