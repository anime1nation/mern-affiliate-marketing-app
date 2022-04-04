import React,{useEffect,useRef,useState} from 'react'
import avatar from '../../assets/image/avatar.png';
import './profile.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import loader from '../../assets/image/loader.gif';
import {setAlert} from '../../action/alert';

import {Convert} from 'mongo-image-converter'
const ProfileCard = ({
    auth: { user, loading,isAuthenticated },
    setAlert
}) => {

    const[userInfo,setUserInfo] = useState({});
    const[isLoading,setIsLoading] = useState(true);

    const[profileImage,setProfileImage] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg");

    const navigate = useNavigate();
    const fecthProfile = async() =>{
        try{
            const res = await axios.get('/api/user/profile-details');
            
            setUserInfo(res.data);
            setIsLoading(false);
            if(res.data.profileImg){
                setProfileImage(res.data.profileImg);
            }
            
        }catch(err){
            console.log(err.message);
            setAlert('Please enroll first.','danger');
            setIsLoading(false);
            navigate('/wallet');
        }

    }

    const imageUpload =async (e) =>{
     try{
        const file = e.target.files[0];
        const data = await Convert(file);
        
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            profileImage:data
        });
        const res = await axios.post('/api/user/upload-profile-picture',body,config);
        setAlert(res.data.msg,'success');
        setProfileImage(data);
        


     }catch(err){
            console.log(err.message);
            setAlert('Profile Picture Upload Failed','danger');
     }

    }


    

    
    useEffect(() => {
        let isMounted= true;
        

        setTimeout(() => {
            
            if(isMounted){
                fecthProfile();
            }

        }, 2000);

        
        return () => {
            isMounted.current = false;
        }
    }, []);
    
  return (
    <div className='col-sm-12'>
        <div className='card shadow-md' style={{
            borderRadius: '10px',
        }}>
            {
                isLoading  ? 
                <div className='loader' style={{
                    marginTop: '20%',
                    marginLeft: '20%',
                }}>
                    <img src={loader} alt='loading'/>
                </div>
                :
              userInfo ? <div className='card-body' >
              <div className='row'>
                  <div className='col-sm-6 profileImage'>
                     
                          
                      
                      <div className="image-upload">
                          <label htmlFor="file-input" data-toggle="tooltip" data-placement="top" title="Double Click to Upload Picture">
                              <img src= {
                                   profileImage 
                              } style={{
                                  width: '120px',
                                  height: '120px',
                                  
                                  pointer:'cursor'
                              }}  />
                          </label>

                          <input id="file-input" name="profileImage" type="file" onChange={
                              (e) => {
                                  imageUpload(e);
                              }
                          } />
                      </div>
                  
                   </div>  
                   <div className='col-sm-6 profileName'>
                       <h5>{
                           userInfo.name
                           }</h5>
                       <strong>{
                              userInfo.dob
                           }</strong>
                   </div>
                  <hr/>     
          </div>
          <div className='row'>
              <div className='col-sm-12'>
                      <table className='table table-borderless'>
                          <tbody className='profileCard'>
                              <tr>
                                  <td>
                                      
                                          <strong>
                                              Refer Id
                                          </strong>
                                   </td>
                                   <td> { userInfo.referId } 
                                       </td>  

                                  </tr>

                                 
                                  <tr><td> User Name</td><td>{
                                      userInfo.username
                                      }</td></tr> 
                                  <tr><td> Uplink Referal</td><td>{
                                      userInfo.uplinkReferId
                                      }</td></tr> 
                                  <tr><td> Package</td><td>{userInfo.package}</td></tr> 
                                  <tr><td> Status</td><td>{userInfo.status}</td></tr> 
                                  <tr><td> KYC status</td><td>{userInfo.KYCstatus}</td></tr>   
                               </tbody>
                            </table>
                            </div>
                            </div>             
          </div>:null
}
        </div>    
    </div>
  )
}
const mapStateToProps = state => ({
    auth : state.auth
});
export default connect(mapStateToProps,{setAlert})(ProfileCard);