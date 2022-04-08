import React, { useEffect } from 'react'
import {connect}  from 'react-redux';
import { loadSingleUser } from '../../action/admin';
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import loader from '../../assets/image/loader.gif';
import { Fragment } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import { setAlert } from '../../action/alert';
const SingleUserInfo = ({loadSingleUser,isAuthenticated,setAlert}) => {

    const navigate = useNavigate();


    
  
    
    const { id } = useParams();
    const [user,setUser] = React.useState({});
    const [ bankDetails, setBankDetails ] = React.useState({});
    const [isLoading,setIsLoading] = React.useState(true);
    

     
    
    const getDocs = async () => {
        try{
            const res = await axios.get(`/api/admin//kyc-details/${id}`);
            setUser(res.data.data);
            console.log(res.data);
            setIsLoading(false);
        }catch(err){
            console.log(err);
        }
    }
    const getBankDetails = async () => {
        try{
            const res = await axios.get(`/api/admin/bank-details/${id}`);
            setBankDetails(res.data.data);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        

           getDocs();
            getBankDetails();
    },[])
    

    const handleBlock=(e)=>{
        try{
            e.preventDefault();
            const res = axios.post(`/api/admin/block/${id}`);
            setAlert('User Blocked Successfully','success');    
            navigate('/admin');
        }catch(err){
            console.log(err.message);
        }
    } 

  return (
    
      isLoading && !user ? <Fragment> 
        
        <AdminSidebar />
        <div className='row'>
            <AdminNavbar />
        </div>

    
          
          <img src={loader} alt="loader" className="loader"style={{
        top: '30%',
          left: '40%',
          position: 'absolute',
    }} /> <h5 style={{
        top: '40%',
          left: '40%',
          position: 'absolute',
    }}>Loading Please Wait....</h5>  </Fragment>:  

<Fragment>
    <div className='container-fluid'>
        <AdminSidebar />
        <div className='row'>
            <AdminNavbar />
        </div>

    
        <div className='row'>
            <div className='col-md-2'>
                <Link to='/admin' ><i className="fa-solid fa-left-long fa-3x"  ></i></Link>
             </div>
             <div className='col-md-10 text-right'>
                <button className='btn btn-danger btn-lg red' onClick={e=>{
                    handleBlock(e)
                }} >Block</button>
              </div>   
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <div className='card shadow-lg' style={{
                    backgroundColor: '#EBEBEB',
                    borderRadius:'20px'
                }}>
                    <div className='card-body'>
                        <table className='table borderless'>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Refer Id</td>
                                    <td>{user.referId && user.referId}</td>

                                </tr>
                                <tr>
                                    <td>Uplink Refer Id </td>
                                    <td>{user.uplinkReferId && user.uplinkReferId}</td>
                                </tr>
                                <tr>
                                    <td>Mobile</td>
                                    <td>{user.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                       {user.email}
                                    </td>
                                    
                                </tr>  
                                <tr>
                                    <td>DOB</td>
                                    <td>
                                       {user.dob ? user.dob:'NA'}
                                    </td>
                                    
                                </tr>  

                                <tr>
                                    <td>Joining Date</td>
                                    <td>
                                       { moment(user.enrolledDate).format('DD-MM-YYYY')}  
                                    </td>
                                    
                                </tr>  
                                <tr>
                                    <td>Aadhar</td>
                                    <td>{
                                        user.aadhar ? user.aadhar:'NA'}</td>
                                </tr>

                                <tr>
                                    <td>Pan</td>
                                    <td>{
                                        user.pan ? user.pan:'NA'}</td>

                                </tr>
                                
                            </tbody>                 
                        </table>
                    </div>
                </div>
            </div>
            <div className='col-md-8'>
                 <div className='card shadow-md' style={{
                     backgroundColor: '#EBEBEB',
                     borderRadius:'20px'
                 }}>
                    <div className='card-body'>
                        <h5>Banking Details</h5>
                        <table className='table borderless'>
                            <tbody>
                                <tr>
                                    <td>Bank Name</td>
                                    <td>{bankDetails.bankName ? bankDetails.bankName : 'NA'}</td>

                                    
                             </tr>
                                <tr>
                                    <td>Account Number</td>
                                    <td>{bankDetails.accountNo ? bankDetails.accountNo : 'NA'}</td>
                                </tr>
                                <tr>
                                    <td>IFSC Code</td>
                                    <td>
                                    {bankDetails.ifsc ? bankDetails.ifsc : 'NA'}
                                    </td>

                                </tr>
                                <tr>
                                     <td>UPI ID</td>
                                     <td>
                                     {bankDetails.upiId ? bankDetails.upiId : 'NA'}</td>
                                 </tr> 
                                <tr>
                                    <td>Branch Name</td>
                                    <td>
                                    {bankDetails.branchName ? bankDetails.branchName : 'NA'}
                                        </td>
                                 </tr>
                                 <tr>
                                    <td>Branch Address</td>
                                    <td>
                                        Address</td>
                                 </tr>
                                 <tr>
                                     <td>Branch City</td>
                                     <td>
                                     {bankDetails.branchCity ? bankDetails.branchCity : 'NA'}</td>
                                 </tr> 

                                  <tr>
                                     <td>Branch State</td>
                                     <td>
                                     {bankDetails.branchState ? bankDetails.branchState: 'NA'}</td>
                                 </tr>                      
                             </tbody>

                                                
                        </table> 
                    </div>
                 </div>

            </div>    
        </div>   

        <div className='row shadow-md'>
            <div className='col-md-4'>
              { user.panImg!=='' ? <img src={ user.panImg } alt="pan" className="img-fluid" style={{
                    width: '200px',
                    height: '200px',}} /> : <span>No Image</span>}
              <p> PAN </p>
            </div>  
            <div className='col-md-4'>
               {user.aadharFrontImg !=='' ? <img src={user.aadharFrontImg } alt="pan" className="img-fluid" style={{
                    width: '200px',
                    height: '200px',}} /> : <span>No Image</span>

               }
               <p>Aadhar Front</p>
            </div>  
            <div className='col-md-4'>
                 {user.aadharBackImg!==''  ? <img src={user.aadharBackImg } alt="pan" className="img-fluid" style={{
                        width: '200px',
                        height: '200px',}} />: <span>No Image</span>
                        }
                       <p>Aadhar Back</p> 
            </div>  
            <div className='col-md-4'>
                    {user.passbookImg  ?  <img src={user.passbookImg } alt="pan" className="img-fluid" style={{
                            width: '200px',
                            height: '200px',}} />:
                            <span>No Image</span>
                    }
                    <p>Passbook</p>
            </div>  
            
         </div>    
         
    </div>
    </Fragment>         
  )
}

const mapStateToProps = (state) =>{
    return{
        user:state.admin.user,
        isAuthenticated:state.adminAuth.isAuthenticated
    }
}

export default connect(mapStateToProps,{loadSingleUser,setAlert})(SingleUserInfo);