import React,{useEffect} from 'react'
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import moment from 'moment';
import loader from '../../assets/image/loader.gif';
import  icon from '../../assets/image/icon.png';

const Notice = () => {

    const [notices, setNotices] = React.useState([]);
    const [isNoticeLoaded, setIsNoticeLoaded] = React.useState(false);

    const fetchNotices = async () => {
        try{
            const res = await axios.get('/api/user/notices');
            setNotices(res.data);
            setIsNoticeLoaded(true);
        }catch(err){
            console.log(err);
        }
        }

    useEffect(() => {
        fetchNotices();

        return () => {
            setNotices([]);
        }
        
    }, []);

  return (
    <div className='card shadow-lg msg-box' style={{
        borderRadius:'20px'
    }} >
                    <div className='text-center'>
                        <h5 className='text-info'> Notice </h5>
                    
                    </div>
                        <div className='card-body'>
                            {
                                isNoticeLoaded ?
                                <SimpleBar style={{ maxHeight: '200px' }}>
                                    {
                                        notices.map((item, index) => {
                                            return (
                                                <p key={item._id}> {index+1}.  {item.msg} 
                                                    <span className='float-right text-danger'>
                                                        {moment(item.datePosted).format('DD-MM-YYYY')}
                                                         </span>
                                                 </p>
                                            )
                                        })
                                }

                                </SimpleBar>   : 
                                <div className='text-center'>

                                    <img src={loader} alt="logo" className='img-fluid text-center' style={{
                                    width: '100px',
                                    height: '100px'
                                }} />  
                                <p className='text-info'>Loading...</p> 
                                 </div>     

                            }
                        </div>
                     </div>
  )
}

export default Notice