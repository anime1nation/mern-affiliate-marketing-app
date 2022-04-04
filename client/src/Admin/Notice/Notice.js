import React,{Fragment,useState,useEffect} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import loader from '../../assets/image/loader.gif';
import Alerts from '../../Components/Alerts';
import { Alert } from 'react-bootstrap';

const Notice = ({
    setAlert
}) => {

    const[msg,setMsg]=useState('');
    const [notices,setNotices] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const fetchNotice = async()=>{
        try{
            const res = await axios.get('/api/admin/notices');
            setNotices(res.data.notice);
            setIsLoading(false);
            console.log(notices);

        }catch(err){
            console.log(err.message);
            setAlert('Server Error','danger');

        }
    }

    const deleteNotice = async(id)=>{
        try{
            const res = await axios.delete(`/api/admin/delete-notice/${id}`);
            setAlert('Notice Deleted','primary');
            console.log(res.data);
            fetchNotice();
        }catch(err){
            console.log(err.message);
            setAlert('Server Error','danger');
        }
    }
    
    useEffect(() => {
        fetchNotice();
      }, [])


    const submitNotice = async () =>{
        try{
            const body=JSON.stringify({msg});
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }

            const res = await axios.post('/api/admin/add-notice',body,config);

            setAlert('Notice Submitted Successfully','success');
            setMsg('');
            fetchNotice();
        }catch(err){
            console.log(err.message);
            setAlert('Server Error','danger');
        }

    }
      
  
  return (
    <Fragment>
        <AdminSidebar />
        <div className='container-fluid' style={{
            padding:'0'
        }}>
            <div className='row'>
                <AdminNavbar />
                <Alerts />
            </div>
            <div className='row'>
                <div className='col-sm-8'>
                    <textarea className='form-control' rows={10} value={msg} onChange={e=>{
                            setMsg(e.target.value)
                    }} >

                    </textarea>
                </div>   
                <div className='col-sm-4 my-auto'>
                    <button className='btn btn-primary  btn-block' style={{
                        borderRadius:'20px',
                    
                    }} onClick={e=>{
                        submitNotice()
                    }}>Post Notice</button>
                </div>    
            </div>  
            <div className='row'>
            {    
            isLoading ? <div className='col-sm-12 text-center'>
                    <img src={loader}  />
                    <p className='text-danger'>Loading Please wait....</p>
                 </div> :
                <div className='col-sm-12'>
                    <h5> Notice Displaying</h5>
                    <hr />
                {notices.map(notice => (    
                <div className='card shadow-md' key={notice._id}>   
                    <div className='card-body'>
                       <div className='row'>
                            <div className='col-10'>
                                <p> { notice.msg }  </p> 

                            </div>
                            <div className='col-sm-2 text-right'>
                               <a href='#'> <i className='fa-solid fa-trash-alt fa-2x' style={{
                                    mouse: 'pointer'
                                }} onClick={e=>{
                                    deleteNotice(notice._id)
                                }} ></i></a>
                            </div>    
                        </div>    

                     </div>   
                </div> 
                ))
            }
                </div>
            }
            </div>        
        </div>       

    </Fragment>
  )
}

export default  connect(null,{setAlert})(Notice);
