import React,{Fragment, useState, useCallback, useEffect} from 'react'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import icon from '../../assets/image/icon.png'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../action/alert';
import Alerts from '../../Components/Alerts';
import loader from '../../assets/image/loader.gif';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import { useNavigate } from 'react-router-dom';

const UserDetailCards = () => {

    const {id}=useParams();

    const [user,setUser]=useState({
    });
    const [isloading,setIsloading]=useState(true);
    const [images,setImages]=useState({
        aadharBackImg:'',
        aadharFrontImg:'',
        panBackImg:'',
    });

    const[show,setShow]=useState(false);
    const[remarks,setRemarks]=useState('');

    const navigate = useNavigate();

    const getUser = async() => {
        try{
            const res = await axios.get(`/api/admin/kyc-details/${id}`);
            setUser(res.data.data);
            setIsloading(false);
          
        }catch(err){
            console.log(err.message);
            
        }
    }

    useEffect(()=>{
        getUser();
    },[])
    
    const onDecline = async() => {
        try{
            const body = JSON.stringify({
                reason:remarks});

            const config ={
                headers:{
                    'Content-Type':'application/json'
                }
            }    

            const res = await axios.put(`/api/admin/kyc-decline/${id}`,body,config);
            setAlert('Declined KYC Request', 'success');
            setRemarks('');
            setShow(false);
            setTimeout(()=>{
                navigate('/admin/kyc-request');
            }
            ,1000);
        }catch(err){
            console.log(err.message);
            setAlert('Declined KYC Request', 'danger');
            setRemarks('');
            setShow(false);
        }
    }

    const onApproval = async(e) =>{
        try{
            const res = await axios.put(`/api/admin/kyc-approve/${id}`);
            setAlert('Approved KYC Request', 'success');
            setTimeout(()=>{
                navigate('/admin/kyc-request');
            }
            ,1000);
            
        }catch(err){
            setAlert('Server Error','danger');
        }
    }


return(
    isloading? <div className="loader" style={{
        position: 'absolute',
        top: '40%',
        left: '40%',
    }}>
    <img src={loader} alt="loader" />
    </div>:


        <div className='container-fluid'>
            <AdminSidebar />
            <AdminNavbar />
            

            <div className='row'> <Alerts />  </div> 
            

        <div className='row'>
            <div className='col-md-2'>
                  <i className='fa fa-left-arrow fa-3x'></i>  
             </div>
           
        </div>
        
        <div className='row'>
            <div className='col-md-4'>
                <div className='card shadow-md' style={{
                    backgroundColor: '#EBEBEB',
                }}>
                    <div className='card-body'>
                        <table className='table borderless'>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{ user.name }</td>
                                </tr>
                                <tr>
                                    <td>Mobile</td>
                                    <td>{user.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                       { user.email }
                                    </td>
                                   
                                </tr>  
                                <tr>
                                    <td>DOB</td>
                                    <td>{user.dob}</td>
                                </tr>
                                <tr>
                                    <td> Refer Code </td>
                                    <td>{user.referId}</td>

                                </tr>
                                <tr>
                                    <td>Package</td>
                                    <td>{user.package}</td>
                                </tr>
                                <tr>
                                    <td>Aadhar Number</td>
                                    <td>{user.aadhar}</td>
                                </tr>
                                <tr>
                                    <td>Pan Number</td>
                                    <td>{user.pan}</td>
                                </tr>
                                
                            </tbody>                 
                        </table>
                    </div>
                </div>
            </div>
            <div className='col-md-8'>
                 <div className='card shadow-md' style={{
                     backgroundColor: '#EBEBEB',
                 }}>
                    <div className='card-body'>
                        <h5>Banking Details</h5>
                        <table className='table borderless'>
                            <tbody>
                                <tr>
                                    <td>Bank Name</td>
                                    <td>{ user.bankDetails && user.bankDetails.bankName}</td>

                                    
                             </tr>
                                <tr>
                                    <td>Account Number</td>
                                    <td>{user.bankDetails && user.bankDetails.accountNo}</td>
                                </tr>
                                <tr>
                                    <td>IFSC Code</td>
                                    <td>
                                        {user.bankDetails && user.bankDetails.ifsc}
                                    </td>

                                </tr>
                                <tr>
                                    <td>Branch Name</td>
                                    <td>
                                        { user.bankDetails && user.bankDetails.branchName}
                                        </td>
                                 </tr>
                                 
                                 <tr>
                                     <td>Branch City</td>
                                     <td>{user.bankDetails && user.bankDetails.branchCity}
                                         </td>
                                 </tr>                    
                                 <tr>
                                        <td>Branch State</td>
                                        <td>{user.bankDetails && user.bankDetails.branchState} </td>
                                     </tr>   
                             </tbody>

                                                
                        </table> 
                    </div>
                 </div>

            </div>    
        </div>   

        <div className='row text-center'>
                        <div className='col-md-3 mt-3' >
                            
                                  <img src={user.aadharFrontImg} alt='image' style={{
                                        width:'10rem',
                                        height:'10rem',
                                        objectFit:'cover'

                                    }}/>
                               
                        </div>

                        <div className='col-md-3 mt-3' >
                            
                                  <img src={user.aadharBackImg} alt='image' style={{
                                        width:'10rem',
                                        height:'10rem',
                                        objectFit:'cover'
                                    }}/>
                               
                        </div>

                        <div className='col-md-3 mt-3' >
                            
                                  <img src={user.panImg} alt='image' style={{
                                        width:'10rem',
                                        height:'10rem',
                                        objectFit:'cover'
                                    }}/>
                               
                        </div>

                        <div className='col-md-3  mt-3' >
                            
                                  <img src={user.passbookImg} alt='image' style={{
                                        width:'10rem',
                                        height:'10rem',
                                        objectFit:'cover'
                                    }}/>
                               
                        </div>
            
        </div>         
{
 show ? <div className='row'> 
    <div className='col-md-8'>
        <textarea className='form-control' rows={5} value={remarks} onChange={e=>{
            setRemarks(e.target.value);
        }}>

        </textarea>
 </div> 
 <div className='col-md-4'>
    <button className='btn btn-danger' onClick={(e)=>{
        onDecline()   
    }}>Decline</button>

</div>    
 
 </div> : null

}
        {
            !show ? (!user.isKYCApproved ? <div className='row'>
            <div className='col-sm-6'>
                <a className='btn btn-primary btn-block' onClick={(e)=>{
                    onApproval();
                }}> Approve </a>
              </div>    
              <div className='col-sm-6'>
                <a className='btn btn-danger btn-block red' onClick={e=>{
                    setShow(true);
                }}> Decline </a>
              </div>    
          </div>: <strong className='text-success'>User KYC already approved</strong> )    
        : null  
        }
        </div>
    

  )
}

export default UserDetailCards