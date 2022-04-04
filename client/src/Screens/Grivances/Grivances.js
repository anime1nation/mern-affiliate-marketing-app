
import React,{useState} from 'react'
import UserNavbar from '../Wallet/UserNavbar'
import './grivances.css'
import Footer from '../components/Footer';
import { Convert } from 'mongo-image-converter';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../action/alert'
import Alerts from '../../Components/Alerts';
import { useNavigate } from 'react-router-dom';
const Grivances = ({
    setAlert
}) => {

    const navigate = useNavigate();
    const[formData,setFormData]=useState({
        category:'',
        subject:'',
        description:'',
        img:'',
    });

    const {category,subject,description,img}=formData;


    const onChangeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const onFileChange = async(e) => {
        const file = e.target.files[0];
        try{
            const buffer = await Convert(file);
        setFormData({...formData,[e.target.name]:buffer});
        }catch(err){
            console.log(err.message);
        }
    }

    const onSubmitHandler = async(e) => {

        e.preventDefault();
        if(category==='' || subject==='' || description===''){
            setAlert('Please fill all the fields','danger');
        }else{
            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify({
                    category,
                    subject,
                    description,
                    img
                });
                const res = await axios.post('/api/user/submit-grivances',body,config);
                setAlert('Your Grivance submitted successfully. Reference Id: '+res.data,'success');
                setFormData({
                    category:'',
                    subject:'',
                    description:'',
                    img:'',
                });
            }catch(err){
                console.log(err.message);
                
            }
        }
    }



  return (
    <div className='congtainer-fluid' style={{
        backgroundColor: '#F56812',
        padding:0
    }}>
        <div className='row'>
            <UserNavbar />

        </div>
        <div className='row'>
            <div classNma='col-sm-12'>
            <Alerts />
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 text-right'>
                <button className='btn btn-primary white text-dark shadow-lg' style={{
                    color:'#000'
                }}  onClick={e=>{
                     navigate('/grivances')
                    
                   
                }} > View Grivances </button> 
            </div>
        </div>            

        <div className='row mt-5'>
            <div className='col-sm-6 offset-3'>
                <div className='card shdow-md' style={{
                    border:'1px solid #fff',
                    borderRadius:'10px'
                }}>
                    <div className='card-body px-3'>
                        <h4 className='card-title text-center' style={{
                            fontWeight:'bold'
                        }}>Register Your Grivances</h4>
                        <table>
                            <tbody className='grivancesTable'>
                                <tr>
                                    <td>
                                        <strong>Nature of Grivances</strong>
                                    </td>
                                    <td>
                                        <div className='form-group'>
                                            <select className='form-control' name='category' value={category}onChange={e=>{
                                                onChangeHandler(e)
                                            }}>
                                                <option>Select</option>
                                                <option value='sales'>Sales</option>
                                                <option value='refer'>Refer Earn</option>
                                                <option value='transaction'>Transaction</option>
                                                <option value='kyc'>KYC Request</option>
                                                <option value='other'>Other</option>
                                            </select>    
                                        </div>      
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <strong>Subeject</strong>
                                    </td>
                                    <td>
                                        <input type='text' className='form-control' name='subject' value={subject} onChange={e=>{
                                            onChangeHandler(e)
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Description</strong>
                                    </td>
                                    <td>
                                        <textarea className='form-control' row={3} name='description' value={description} onChange={e=>{
                                            onChangeHandler(e)
                                        }}>

                                        </textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Upload Attachment</strong>
                                    </td>
                                    <td>
                                        <input type='file' className='form-control' name='img' onChange={e=>{
                                            onFileChange(e)
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                    <button className='btn col-sm-6' style={{
                                  backgroundColor: '#F56812',
                                  borderRadius:'25px'
                              }} onClick={e=>{
                                  onSubmitHandler(e)
                              }} > Submit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>    
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default connect(null,{setAlert})(Grivances)