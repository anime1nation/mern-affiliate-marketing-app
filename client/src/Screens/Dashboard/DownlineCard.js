import React, { useEffect,useRef } from 'react';
import SimpleBar from 'simplebar-react';
import SingleProfileCard from './SingleProfileCard';
import { connect } from 'react-redux';
import axios from 'axios';
import loader from '../../assets/image/loader.gif';
import {loadUser} from  '../../action/auth';
import { loadDownline } from '../../action/dashboard';
import { setAlert } from '../../action/alert';
const DownlineCard = ({
    
    loadUser,
    downline,
    loadDownline,
    setAlert
}) => {

    const [userDownline,setUserDownline] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    const [user,setUser] = React.useState({});
    const [referId,setReferId] = React.useState('');
    const [downlineCount,setDownlineCount] = React.useState(0); 

    const load = async () =>{
        try{
            const res = await axios.get('/api/auth');
            setUser(res.data);
            setIsLoading(false);
            loadDownline({
                userid:res.data.referId
            })
            setDownlineCount(0);
        }
        catch(err){
            setIsLoading(true);
            console.log(err.message);
            const errors = err.response.data.errors;
            errors.forEach(er => {
                setAlert(er.message,'danger') 
            });
            
        }
    }
    const onClickHandler = () =>{
        loadDownline({

        }) 
    }
   
    let isMounted = useRef(false); 

    useEffect(() => {
        isMounted=true;
        if(isMounted){
            load();
        }

        return ()=>{
            isMounted =false
        }
    },[]);
        
     if(downlineCount > 2){
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        
                        <div className='col-sm-12'> 
                        <i className="fa-solid fa-left-long fa-3x"  style={{
                            cursor:'pointer',
                        }}  onClick={e=>{
                            load();
                        }} ></i>
                         </div>
                         <h4 className="card-title">Downline</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="text-center text-danger" role="alert">
                                    <strong>You can't view more than 3 downline</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='col-sm-12'>
                <div className='card shadow-lg ' style={{
                    "borderRadius":"20px",
                    
                }}>
                    <div className='card-body'>
                        <div className='col-sm-12'> 
                        <i className="fa-solid fa-left-long fa-3x"  style={{
                            cursor:'pointer',
                        }}  onClick={e=>{
                            load();
                        }} ></i>
                        <h5 className='text-center'>
                            Downline
                        </h5>
                         </div>
    
            {
                isLoading  ? 
                <div className='loader text-center'>
                    <img src={loader} />
                </div> : ( downline===undefined || downline.length <1 ) ? 
    
                <h5 className='text-center'>No Downline for this User </h5>:
    
                        <SimpleBar style={{ maxHeight: '30em' }}> 
                             <div className='row'>
    
                                    
                                 
                                {
    
                                    downline.map(downlinuser => {
                                        return(

                                           downlinuser.referId && <div className='col-sm-3'key={downlinuser._id} style={{
                                                cursor:'pointer'
                                            }} >
                                                <div className='card text-center shadow-lg' style={{
                                                backgroundColor:"#00000029",
                                                borderRadius:"10px",
                                                color:'#000'
                                                                                            
                                    
                                            }} onClick={e=>{
                                                try{
                                                   
                                                    loadDownline({userid:downlinuser.referId});
                                                    setDownlineCount(downlineCount+1);
                                                }catch(err){
                                                    console.log(err.message);
                                                }
                                            }} >
                                                    <img className='img-card-top img-rounded   img-fluid' src={user.profileImg} style={{
                                                        width:'5rem',
                                                        height:'5rem',
                                                        alignSelf:'center',
                                                        marginTop:'1rem'
                                    
                                                    }} />
                                                    <div className='card-body text-center'>
                                                        <h6> {downlinuser.name} </h6>
                                                        <p> {downlinuser.referId} </p>
                                                        <p></p>
                                                </div>
                                                </div>
                                              </div>
                                            
                                        )
                                    })
                                }
                              </div>  
                         </SimpleBar>
    
                            }             
                    </div>    
                </div>
            </div>        
        );
    }
        
}
    
    
    
    


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        downline: state.dashboard.downline
    }
}

export default connect(mapStateToProps,{loadUser,loadDownline,setAlert})(DownlineCard);