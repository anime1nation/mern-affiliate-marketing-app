import React,{useLayoutEffect,useRef,useState} from 'react'
import './profile.css'
import axios from 'axios';
import { setAlert } from '../../action/alert';
import Alerts from '../../Components/Alerts';
import loader from '../../assets/image/loader.gif'
const BasicDetailCard = () => {
    
    const [isloading,setIsLoading] = useState(true);
    const [isdisabled,setIsdisabled] = useState(false);
    const [ formData, setFormData ] = useState({
        email:'',
        mobile:'',
        aadhar:'',
        pan:'',
        dob:'',
        address1:'',
    });


    
    const { email, mobile, aadhar, pan, dob, address1 } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const fetchBasicDetails = async () => {
        try{
            const res = await axios.get('/api/user/basic-details');
            
            
                setFormData(res.data.data);
            if(res.data.data.aadhar && res.data.data.pan){
                setIsdisabled(true);
            }
            
            setIsLoading(false);
        
        }catch(err){
            console.log(err.message);

        }
    }


    let isMounted= useRef(false);


    useLayoutEffect(() => {
        isMounted=true;
        
        setTimeout(() => {
            if(isMounted){
                fetchBasicDetails();
            }
        },1000);

        return () =>{
            isMounted=false;
        }
    }, []);



    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
              const  config={
                headers:{
                    'Content-Type':'application/json'
                    }
                }
                const body = JSON.stringify({formData});
                const res = await axios.post('/api/user/update-basic-details',body,config);
                setAlert(res.data.msg,'success');
                fetchBasicDetails();
                setIsdisabled(true);
                alert('Basic Details Updated Successfully');
        }catch(err){
            console.log(err.message);
        }
    }

  return (
   <div className='col-sm-12'> 
        <div className='card shadow-md' style={{
            borderRadius: '10px',
        }}>

            <div className='card-body'>
        {
            isloading ?
            <div className='d-flex justify-content-center'>
                <img src={loader} alt='loader' style={{width:'100px'}}/>
            </div>
            :


                <table className='table table-borderless'>
                    <tbody className='basicDetailTable'>
                        <tr>
                            <td>
                                <span>Email</span>
                            </td>
                            <td> <input type='email' name='email' onChange={e=>{
                                onChange(e)
                            }} value={email} disabled={isdisabled} className=' form-control-md validate ' required={true}/> </td>    
                        </tr> 

                        <tr>
                            <td>
                                <span>Mobile</span>
                            </td>
                            <td> <input type='text' name='mobile ' value={mobile} onChange={e=>{
                                onChange(e)
                            }} className=' form-control-md validate' disabled={isdisabled} required={true} /> </td>    
                        </tr>  

                        <tr>
                            <td>
                                <span>Aadhar</span>
                            </td>
                            <td> <input type='text' name='aadhar' value={aadhar} onChange={e=>{
                                onChange(e)
                            }} className=' form-control-md validate' disabled={isdisabled} required={true}/> </td>    
                        </tr> 

                        <tr>
                            <td>
                                <span>PAN</span>
                            </td>
                            <td> <input type='text' name='pan' value={pan} onChange={e=>{
                                onChange(e)
                            }} className=' form-control-md validate' disabled={isdisabled} /> </td>    
                        </tr>  

                        <tr>
                            <td>
                                <span>Address</span>
                            </td>
                            <td> <input type='text' name='address1' value={address1} onChange={e=>{
                                onChange(e)
                            }}  className=' form-control-md validate' disabled={isdisabled}  required={true}/> </td>    
                        </tr>  
                        <tr className='text-center'>
                            
                            <td><button className='btn btn-block col-sm-12  orange darken-2' onClick={e=>{
                                onSubmit(e)
                            }} >Submit</button></td>
                        </tr>
                    </tbody>
                </table>
               
       }       
             </div>             


        </div>
            <Alerts />
   </div>
  )
}

export default BasicDetailCard;