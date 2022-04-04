import React,{useEffect,useState} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import AdminSidebar from '../Components/AdminSidebar';
import UserDetailCards from './UserDetailCards';
import {loadKYCRequest} from '../../action/admin';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Fragment } from 'react/cjs/react.production.min';
const KYCRequest = ({
    loadKYCRequest
}) => {

    const navigate = useNavigate();
    
    const [users,setUsers]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    
    const load = async () =>{
        try{
            const res = await axios.get('/api/admin/kyc-request');
            setUsers(res.data);
            setIsLoading(false);
            console.log(res.data);
        }catch(err){
            
            console.log(err.message);
        }
    }


    useEffect(() => {
        load();
    },[]);


  return (

    isLoading ? 
    <Fragment>
        <div className='text-center'>
        <img src='/assets/image/loader.gif' alt="loader" className="loader" />
        <p className='txt-wallet-card'  className='text-info'>Loading...</p >
        </div> 
    </Fragment>
    :
        

    <div className='conatiner-fluid'>
        <AdminSidebar /> 
        <div className='row'>
            <AdminNavbar />
        </div>

        <div className='row'>
            <div className='col-md-12'>
                {
                    users.length > 0 ? 
                <SimpleBar style={{ maxHeight: '100vh' }}>
               <table className='table'>
                   <thead className='bg-dark text-light'>
                          <tr>
                          <th>Name</th>
                          <th> Username </th>
                          <th>Refer Id</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Package</th>
                          <th>Enroll Date</th>
                          <th></th>
                          
                         </tr>
                    </thead>
                   <tbody className=' borderless user-info-table '>
                          {users.map((user,index)=>{
                                return(
                                    <tr key={index} className='shadow-md pt-5' style={{
                                        backgroundColor: '#EBEBEB',

                                    }}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.referId}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.email}</td>
                                        <td>{user.package}</td>
                                        <td>{moment(user.enrollDate).format('DD/MM/YYYY')}</td>
                                        <td> <button className='btn btn-primary btn-block user-info-deatils-button'  onClick={
                                            e => {
                                            navigate(`/admin/kyc-request/user/${user.id}`)
                                        } }> Deatils </button> </td>
                                    </tr>
                                )
                            }
                            )}
                            
                                
                        </tbody>   
                 </table>     
                </SimpleBar>  :
                <div className='text-center'>
                    <h5>No KYC Request</h5>
                </div> 
                }     
            </div>
        </div>      
    </div>



    
  )

}

const mapStateToProps = (state) => {
    return {
        KYCRequest: state.admin.users
    }
}

export default connect(mapStateToProps,{loadKYCRequest})(KYCRequest);