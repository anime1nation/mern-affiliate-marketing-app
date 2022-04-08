import React, { useEffect,useState,useRef } from 'react'
import SimpleBar from 'simplebar-react';
import './userinfo.css';
import { connect } from 'react-redux';
import { loadSingleUser } from '../../action/admin';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Fragment } from 'react/cjs/react.production.min';
import moment from 'moment';
import axios from 'axios';
import { setAlert } from '../../action/alert';
const UserInfo = ({
    
    loadSingleUser,
    isAuthenticated,
    setAlert
    
}) => {


    const [users,setUsers] = useState([]);
    const [isloading,setIsloading] = useState(true);

    const [searchTerm,setSearchTerm] = useState('');

    const loadEnrolledUser = async () => {

        try{
            const res = await axios.get('/api/admin/verified-users');
            setUsers(res.data);
            setIsloading(false)
        }catch(err){
            
        }

        }

    const searchUser = async(val)=>{
        if(val===''){
            loadEnrolledUser();
        }
        else{
            try{
                const res = await axios.get(`/api/admin/search-by-username/${val}`);
                setUsers(res.data);
               
                
            }catch(err){
                const errors = err.response.data.errors;
                if(errors){
                    errors.forEach(error => setAlert(error.msg,'danger'));
                }
            }
        }
    }    

    const  onFilterChange = async(e)=>{
        try{
            const userType = e.target.value
            if(userType==='all'){
                loadEnrolledUser();
            }else{
                const res=await axios.get(`/api/admin/users/package/${userType}`);
                setUsers(res.data);
                console.log(res.data);

            }
        }catch(err){
            console.log(err.message);
        }

    }
    
    const navigate = useNavigate();
    let isMounted = useRef(false);
    useEffect(() => {

        isMounted=true;
        setTimeout(() => {
            if(isMounted){
                loadEnrolledUser();
            }
        },1000);

        return () => {
            isMounted=false;
        }
        
    }, []);


    

    
  return (
   <Fragment >  
{
 
    <div className='container-fluid'>
        <div className='row'>
      
        </div>
        <div className='row'>
            <div className='col-md-12 mt-3'>
                <div className='row px-2 justify-content-center'>
                    <div className='col-sm-8'>
                    <div className="input-group mb-3">
                            
                            <input type="text" placeholder='Username' className="form-control user-search-box"  name="searchTerm" value={searchTerm} style={{
                                caretColor:'royalblue',
                                fontSize:'16px',
                                padding:'5px',
                                fontWeight:'bold'
                            }}  onChange={
                                e=>{
                                    setSearchTerm(e.target.value);
                                    searchUser(e.target.value);
                                }
                            } />
                            
                    </div>
                    </div>

                    
                    

                    <div className='col-sm-3 mt-2' >
                   
                        <div className='form-group'>
                                <select className='form-control' id='exampleFormControlSelect1'  name='userType' onChange={e=>{
                                    onFilterChange(e)
                                }} >
                                    <option value='all'>All</option>
                                    <option value='gold'>Gold</option>
                                    <option value='silver'>Silver</option>

                                </select>
                        
                        </div>
                    </div>    
                  </div>  
                </div>
        </div>  

        <div className='row'>
            <div className='col-md-12'>
                    <div className='text-right'><i className='fa-solid fa-refresh text-right fa-2x' style={{
                        cursor:'pointer'
                    }} onClick={
                       ()=>{ 
                        loadEnrolledUser();
                        setSearchTerm('');
                        
                    }}>
                    </i></div>

                <SimpleBar style={{ maxHeight: '100vh' }}>
                    
               <table className='table'>
                   <thead className='bg-dark text-light'>
                          <tr>
                          <th>Usermame</th>
                          <th>Refer Id</th>
                          <th>Package</th>
                          <th>Sponcer Id</th>
                          <th>Enrollment Date</th>
                          <th></th>
                         </tr>
                    </thead>
                   <tbody className=' borderless user-info-table '>

                       
                          {
                          
                          users.length <1 ? 
                            <tr className='text-center'><th> No User Found </th></tr>
                          :users.map((user,index)=>{
                                return(
                                    <tr key={index} className='shadow-md pt-5' style={{
                                        backgroundColor: '#EBEBEB',

                                    }}>
                                        <td>{user.username}</td>
                                        <td>{user.referId}</td>
                                        <td>{user.package}</td>
                                        <td>{user.uplinkReferId}</td>
                                        <td>{moment(user.enrolledDate).format("DD/MM/YYYY")}</td>
                                        <td><button className='btn btn-primary btn-block user-info-deatils-button'
                                            onClick={ (e)=>{
                                                    
                                                    loadSingleUser(user._id);  
                                                    setTimeout(()=>{
                                                       
                                                        navigate(`/admin/user-info/${user._id}`);
                                                    },1000);
    
                                                
                                            } 
                                                
                                            }
                                        > Deatils</button></td>

                                    </tr>
                                )
                            }
                            )}
                                
                        </tbody>   
                 </table>     
                </SimpleBar>        
            </div>
        </div>      
    </div>

}
  </Fragment>  
  )
}


const mapStateToProps = (state) => {
    return {

        isAuthenticated:state.adminAuth.isAuthenticated
    }
}
export default connect(mapStateToProps,{loadSingleUser,setAlert})(UserInfo);