import React,{useState} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import { Convert } from 'mongo-image-converter';
import axios from 'axios';
const Testimonial = () => {

    const[formData,setFormData]=useState({
        msg:'',
        name:'',
        avatar:''
    })

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
            console.log(body);
            const res = await axios.post('/api/admin/add-testimonial',body,config);
            alert('Testimonial Added Successfully');
            setFormData({
                msg:'',
                avatar:'',
                name:''
            })
        }catch(err){
            console.log(err.message);
        }
    }

  return (
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
  )
}

export default Testimonial