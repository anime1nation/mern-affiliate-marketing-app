import React,{useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import zoom from '../../assets/image/zoom.png'
import axios from 'axios'
import './zoom.css';
import Notice from '../Home/Notice'
const ScheduleCard = ({

}) => {

    
    const [classes,setClasses] = useState([]);

    const getClasses = async () =>{
        try{
            const res = await axios.get('/api/user/get-zoom-meeting-link');
            setClasses(res.data);
            
            
        }catch(err){
           
        }
    }

    let isMounted = useRef(false);

    useEffect(() => {
        isMounted=true;
        setTimeout(() => {
            if(isMounted){
            getClasses();
        }},1000);
        
        return () =>{
            isMounted=false;
        }
    }, []);




  return (
      <div className='col-md-3'>
    <div className='row'>
        <div className='col-md-12'>
            <div className='card shadow-lg  bg-light text-dark' style={{
                borderRadius:'20px'
            }}>
            
                {
                    classes.length > 0 ?
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <p className='text-center' style={{
                                    fontWeight:'bold',
                                    fontSize:'16px'
                                }}>Your Zoom Classes</p>
                            </div>
                            <table>
                            <tbody >
                            {
                                classes.map(item => (
                                    
                                            <tr style={{
                                                borderBottom:'none',
                                            }}>
                                                <td style={{
                                                    textransform:'capitalize',
                                                    fontSize:'16px',
                                                    fontWeight:'600'

                                                }}>{(item.day).toString().toUpperCase()}</td>
                                                <td>{
                                                        <a href={item.link} target='_blank'>
                                                            <img src={zoom} alt='zoom' className='zoomIcon'/>
                                                        </a>
                                                    }</td>
                                            </tr>
                                    
                                ))
                                        
                            }
                            
                            </tbody>
                                </table>
                                 


                        </div>
                    </div>    : null
                }
                    
               </div>
        </div>  
        <div className='col-md-12'>
            <Notice />
        </div>                          
    </div>
    </div>
  )
}

ScheduleCard.propTypes = {}

export default ScheduleCard