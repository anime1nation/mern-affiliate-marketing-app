import React,{useState,Fragment,useEffect,useRef} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import { Convert } from 'mongo-image-converter';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import axios from 'axios';
const Testimonial = () => {

    const[formData,setFormData]=useState({
        msg:'',
        name:'',
        avatar:''
    })

    const [testimonials,setTestimonials]=useState([]);
    const [isloading,setIsloading]=useState(true);


    const {msg,name,avatar}=formData;

    const onChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onFileChange =  async(e) =>{
        const file = e.target.files[0];
        try{
            
            const data = await Convert(file);
            setFormData({ ...formData, avatar: data });
            console.log(formData);
        } catch (err) {
            console.log(err.message);
        }
    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            } 

            const body = JSON.stringify({
                msg,name,avatar
            })
    
            const res = await axios.post('/api/admin/add-testimonial',body,config);
            alert('Testimonial Added Successfully');
            
            setFormData({
                msg:'',
                avatar:'',
                name:''
            })
            fetchTestimonials();
        }catch(err){
            console.log(err.message);
        }
    }


    const fetchTestimonials = async() =>{
        try{
            const res = await axios.get('/api/admin/all-testimonials');
            setTestimonials(res.data.testimonials);
            
            setIsloading(false);
            
        }catch(err){
            console.log(err.message);
        }
    }

    let isMounted = useRef(false);


    useEffect(() => {
        isMounted=true;

        if(isMounted){
            fetchTestimonials();
        }
        return () =>{
            isMounted=false;
        }
    }
    , []);
    

  return (
    <Fragment>
        <div className='container-fluid'>
        <AdminSidebar />
     <div className='row'> <AdminNavbar /> </div>   

     <div className='row'>
         <div className='col-sm-6 mx-auto'>
             <div className='card'>
                 <div className='card-body'>
                        <table className='table '>
                                <tbody  >
                                    <tr style={{
                                        border:'none',
                                    }}>
                                        <td>Name</td>
                                        <td>
                                            <input type='text' name='name' value={name} onChange={e=>{
                                                onChange(e)
                                            }} required={true} />
                                        </td>
                                    </tr>
                                    <tr style={{
                                        border:'none',
                                    }}>
                                        <td>Message</td>
                                        <td>
                                           <textarea rows={2} name='msg' value={msg} onChange={e=>{
                                               onChange(e)
                                           }} />
                                        </td>
                                    </tr>

                                    <tr style={{
                                        border:'none',
                                    }}>
                                        <td>Name</td>
                                        <td>
                                            <input type='file' name='avatar'  onChange={e=>{
                                                onFileChange(e)
                                            }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            
                                        <button aria-colspan={2} className='btn bnt-block' onClick={
                                            e=>{
                                                onSubmit(e)
                                            }
                                        } >Add Now</button>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>    
                 </div>
             </div>
         </div>
     </div>
    </div>

    <div className='container-fluid'>
    {
        isloading ? <div className='spinner-border text-primary text-center' role='status'>
        <span className='sr-only'>Loading...</span>
        </div> :
        <SimpleBar style={{ maxHeight: 300 }}>
        <div className='row'>
            
            {
                testimonials.length > 0 ? testimonials.map(testimonial=>{
                    return(
                    <div className='col-sm-3 text-dark'>
                    <div className='card  shadow-lg' style={{
                    width:'80%',
                    marginLeft:'5%',
                    borderRadius:'10px',
                    backgroundColor:'#fff',
                }}>
                
                    <div className='card-img-top mx-auto text-center mt-3'>
                        <img src={testimonial.avatar} alt="logo " className='img-fluid' style={{
                            width: '10rem',
                            height: '10rem',
                            borderRadius:'50%'
                        }} />    
                    </div>    
                    <div className='card-body text-center'>
                        <h5>
                          { testimonial.name  } 
                        </h5>
                         <p>
                         <strong>"</strong>    {testimonial.msg} <strong>"</strong>
                        </p>
                        <p>
                            <button className='btn btn-danger' onClick={ async (e)=>{
                                try{
                                    const res = await axios.delete(`/api/admin/delete-testimonial/${testimonial._id}`);
                                    alert('Testimonial Deleted Successfully');
                                    fetchTestimonials();
                                }catch(err){
                                    alert('Failed to delete testimonial');
                                }

                            }}  >Delete</button>
                        </p>
                    </div>  
                      
                </div>
                </div>
                    )
                })
 : <h5 className='text-center'>No Testimonials</h5>
            }                                
    
         </div>     

        </SimpleBar>                                           
        
    }                              
     </div>   


    </Fragment>    
  )
}

export default Testimonial