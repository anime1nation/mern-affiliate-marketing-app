import moment from 'moment'
import React,{useState,useEffect,Fragment} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import axios from 'axios';
import loader from '../../assets/image/loader.gif'
import { useNavigate,useParams } from 'react-router-dom';
import MessageContainer from './MessageContainer';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import Alerts from '../../Components/Alerts';
import {loadAdmin} from '../../action/admin';
const AdminSingleGrivances = ({
    setAlert,loadAdmin
}) => {

    const scrollableNodeRef = React.createRef();
    const[grivance,setGrivance]=useState({});
    const [isLoading,setIsLoading]=useState(true);
    const [message,setMessage]=useState('');
    
    let messageList=[] ;

    const[comments,setComments]=useState([]);

    const navigate = useNavigate();



    const {referenceId}=useParams();

    const fetchGrivance = async()=>{
        try{
            const res = await axios.get(`/api/admin/grivance-detail/${referenceId}`);
            
            setGrivance(res.data);
            setIsLoading(false)
            
        }catch(err){
            console.log(err.message);
            setIsLoading(false)
        }
    }

    const fetchComments = async()=>{
        try{
            const res = await axios.get(`/api/admin/grivance-comments/${referenceId}`);
            const data = res.data;
            
          messageList=data;
          console.log(messageList)
           setComments(messageList) ;
            
           
            
          
        }catch(err){
            console.log(err.message);
            setIsLoading(false)
        }
    }

    const onChange = e =>{
        setMessage(e.target.value);
    }

    const onSendMsg = async()=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({
               msg:message,});
            const res = await axios.post(`/api/admin/grivances-comment/${referenceId}`,body,config);
            
            fetchComments();
            setMessage('');
        }catch(err){
            console.log(err.message);
        }
    }


    const onAccept = async(e)=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ status:'accepted' });
            const res = await axios.post(`/api/admin/grivance-status/${referenceId}`,body,config);
            setAlert(res.data.msg,'success');
            fetchGrivance();
        }catch(err){
            console.log(err.message);
        }
    };

    const onReject = async(e)=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ status:'rejected' });
            const res = await axios.post(`/api/admin/grivance-status/${referenceId}`,body,config);
            setAlert(res.data.msg,'success');
            fetchGrivance()
        }catch(err){
            console.log(err.message);
        }
    }

    const onClose = async(e)=>{
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ status:'closed' });
            const res = await axios.post(`/api/admin/grivance-close/${referenceId}`,body,config);
            setAlert(res.data.msg,'success');
            fetchGrivance()
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        let isMounted= true;
        loadAdmin();
            
            if(isMounted){
                
                fetchComments();
                fetchGrivance();
                
            }

        

    }, []);

  return (


    <div className='container-fluid' style={{
        padding:0
    }}>
        <AdminSidebar />
        <div className='row' style={{
        backgroundColor: '#F56812',
        padding:0

    }}>
            <AdminNavbar />
        </div>
        <div className='row'>
           <div className='col-sm-12'>
           <Alerts />
           <i className='fa-solid fa-2x  fa-arrow-left' onClick={e=>{
               navigate('/admin/grivances')
           }} style={{
               cursor:'pointer',
           }} ></i>
           
           </div>

        </div>
        { 
        isLoading?
        <div className='row mt-5'>
         <div className='col-sm-12 text-center'><img src={loader} alt='loader' /></div>
        </div> :
        <div className='row mt-5'>
            

            <div className='col-sm-6'>
                <div className='card shadow-lg' style={{
                    borderRadius: '10px',
                }}>  
                    <div className='card-body'>
                        <h4 className='card-title text-center'> Grivances Deatils </h4>

                        <table className='table '>
                            <tbody><tr><td>Reference ID</td> <td>{grivance.referenceId}</td> </tr>
                            <tr><td>Status</td> <td>{grivance.status}</td> </tr>
                            <tr><td>Submission Date</td><td>{ moment(grivance.date).format('DD-MM-YYYY hh:mm')}</td> </tr>
                            <tr><td>Category</td> <td>{grivance.category}</td></tr>
                            <tr><td>Subject</td> <td>{grivance.subject}</td></tr>
                            <tr><td colSpan={2}>Description</td></tr>
                            <tr> <td>{grivance.description}</td></tr>
                            <tr><td colSpan={2}><img src={grivance.img} alt='grivances' style={{
                                height:'50px',
                                width:'50px'
                            }} /></td></tr>
                            </tbody>
                        </table>    

                        
                    </div>    
                </div>
             <div className='co-sm-12'>
                {
                    grivance.status==='pending'? (<Fragment><button className='btn btn-danger btn-block green accent-3' onClick={(e)=>{onAccept()}} >Accept Grivances</button> <button className='btn btn-danger btn-block red darken-1' onClick={(e)=>{onReject(e)}}>Reject Grivances</button></Fragment>) :  null
                    
                }
                {
                    grivance.status==='accepted'? <button className='btn btn-danger btn-block blue accent-1' onClick={(e)=>{onClose(e)}}>Close Grivances</button> : null
                }
                
              </div>      
            </div>  

            <div className='col-sm-6'>
                <div className='card shadow-lg' style={{
                    borderRadius:'15px'
                }}>
                    
                    <div className='card-body'>
                    <strong>Chat  {grivance.referenceId} </strong> 
                    <i className='fa-solid fa-refresh' style={{
                                        cursor:'pointer'
                                    }} onClick={e=>{
                                        fetchComments();
                                    }}></i>
                                
                        
                        <hr />    
                        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{
                            maxHeight:'400px',
                            height:'300px'
                        }}>
                          {
                            comments.map(comment=>{
                                return (
                                    
                                 
                                        <div className='row' key={comment._id}>
                                            
                                            <MessageContainer  user={comment.commentBy} msg={comment.msg} dateTime={comment.commentAt} />     
                                        </div> 
                                    
                                )
                            }
                            )
                          } 


                        </SimpleBar>
                        <hr />
                        <div className='row mt-2'>
                            <div className='col-sm-10'>
                                <input type='text' className='form-control' name='message' value={message} onChange={e=>{
                                    onChange(e)
                                }} placeholder='Type your message here' />
                            </div>
                            <div className='col-sm-2'>
                                <button className='btn btn-primary' onClick={e=>[
                                    onSendMsg(e)
                                ]}><i className='fa-solid fa-paper-plane'></i></button>
                            </div>

                            </div>
                    </div>  


                 </div>   
            </div>    
            
        </div>
}
    </div>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.adminAuth.isAuthenticated,
}); 
  

export default connect(null,{setAlert,loadAdmin})(AdminSingleGrivances)