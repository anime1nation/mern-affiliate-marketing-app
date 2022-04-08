import moment from 'moment'
import React,{useState,useLayoutEffect} from 'react'
import UserNavbar from '../Wallet/UserNavbar'
import axios from 'axios';
import loader from '../../assets/image/loader.gif'
import { useNavigate,useParams } from 'react-router-dom';
import MessageContainer from './MessageContainer';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
const SingleGrivances = () => {

    const navigate = useNavigate();
    const[grivance,setGrivance]=useState({});
    const [isLoading,setIsLoading]=useState(true);
    
    const [isdisabled,setIsdisabled]=useState(false);
    
    const [message,setMessage]=useState('');
    
    let messageList=[] ;

    const[comments,setComments]=useState([]);

    const scrollableNodeRef = React.createRef();


    const {referenceId}=useParams();

    const fetchGrivance = async()=>{
        try{
            const res = await axios.get(`/api/user/grivance-detail/${referenceId}`);
            
            setGrivance(res.data);
            setIsLoading(false)
            setIsdisabled(res.data.isClosed)
        }catch(err){
            
            setIsLoading(false)
        }
    }

    const fetchComments = async()=>{
        try{
            const res = await axios.get(`/api/user/grivance-comments/${referenceId}`);
            const data = res.data;
            
          messageList=data;
         
           setComments(messageList) ;
            
           
            
          
        }catch(err){
           
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
            const res = await axios.post(`/api/user/grivances-comment/${referenceId}`,body,config);
            
            fetchComments();
            setMessage('');
        }catch(err){
            console.log(err.message);
        }
    }

    useLayoutEffect(() => {
        let isMounted= true;

            
            if(isMounted){
                fetchComments();
                fetchGrivance();
                
            }

        

    }, [fetchComments]);

  return (


    <div className='container-fluid' style={{
        padding:0
    }}>
        <div className='row' style={{
        backgroundColor: '#F56812',
        padding:0

    }}>
            <UserNavbar />
        </div>
        { 
        isLoading?
        <div className='row mt-5'>
         <div className='col-sm-12 text-center'><img src={loader} alt='loader' /></div>
        </div> :

        <div className='row mt-5'>
            
            

            <div className='col-sm-6'>
            <i className='fa-solid fa-arrow-left fa-2x' style={{
                cursor:'pointer'
            }} onClick={e=>{
                navigate('/grivances')

            }} > </i>
                <div className='card shadow-lg' style={{
                    borderRadius: '10px',
                }}>  
                    <div className='card-body'>
                        <h4 className='card-title text-center'> Grivances Deatils </h4>

                        <table className='table '>
                            <tbody><tr><td>Reference ID</td> <td>{grivance.referenceId}</td> </tr>
                            <tr><td>Status</td> <td className='badge badge-info badge-pill mt-1'>{grivance.status}</td> </tr>
                            <tr><td>Submission Date</td><td>{ moment(grivance.date).format('DD-MM-YYYY hh:mm')}</td> </tr>
                            <tr><td>Category</td> <td>{grivance.category}</td></tr>
                            <tr><td>Subject</td> <td>{grivance.subject}</td></tr>
                            <tr><td colSpan={2}>Description</td></tr>
                            <tr> <td>{grivance.description}</td></tr>
                            <tr><td colSpan={2}><img src={grivance.img} alt='grivances' style={{
                                height:'200px',
                                width:'200px'
                            }} /></td></tr>
                            </tbody>
                        </table>    

                    </div>    
                </div>
            </div>  

            <div className='col-sm-6'>
                <div className='card shadow-lg mt-5' style={{
                    borderRadius:'20px'
                }}>
                     
                    <div className='card-body'>
                        
                                <strong>Chat :- {grivance.referenceId} </strong>
                                    <i className='fa-solid fa-refresh' style={{
                                        cursor:'pointer'
                                    }} onClick={e=>{
                                        fetchComments();
                                    }}></i>
                                
                        
                        <hr />    
                        <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{
                            maxHeight:'400px',
                            height:'400px'
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
                        <div className='row mt-2'>
                            <div className='col-sm-10'>
                                <input type='text' className='form-control' name='message' value={message} onChange={e=>{
                                    onChange(e)
                                }} disabled={isdisabled} placeholder='Type your message here' />
                            </div>
                            <div className='col-sm-2'>
                                <button className='btn btn-primary' onClick={e=>[
                                    onSendMsg(e)
                                ]} disabled={isdisabled}> <i className='fa-solid fa-paper-plane'></i> </button>
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

export default SingleGrivances