import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { setAlert } from '../../action/alert';
import {connect} from 'react-redux';
import Alerts from '../../Components/Alerts';
import loader from '../../assets/image/loader.gif'
const BankDetailsCard = ({
    setAlert,
    
}) => {

    const [isExist,setIsExist] = useState(false);
    const [isdisabled,setIsdisabled] = useState(false);
    const [isloading,setIsLoading] = useState(true);

    const [ formData, setFormData ] = useState({
        bankName:'',
        accountNo:'',
        ifsc:'',
        branchName:'',
        branchCity:'',
        upiId:'',
        branchState:''
    });
    const {bankName,accountNo,ifsc,branchName,branchCity,upiId,branchState} = formData;
    const fetchBankDetails = async () => {
        try{
            const res = await axios.get('/api/user/bankDetails');
            
            setFormData(res.data);
            if(res.data.accountNo && res.data.ifsc){
                setIsExist(true);
                setIsdisabled(true);
            }
            
            setIsLoading(false);
        }catch(err){
            console.log(err.message);
        }
    }

    const accountNoCheck = async (e) => {
        const accountNumber = e.target.value;
        try{
            const res = await axios.get(`/api/admin/check-bank-account/${accountNumber}`);
            
        }
        catch(err){
            console.log(err.message);
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => setAlert(error.msg,'danger'));
            }
            setFormData({...formData,accountNo:''});
        }
    }



    let isMounted = useRef(false);

    useEffect(() => {
        isMounted=true;
        
        setTimeout(() => {
            if(isMounted){
            fetchBankDetails();
        }},1000);

        return () =>{
            isMounted=false;
        }
    }, []);

    
    const onChange = (e) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async(e) =>{
        
        try{
           const  config={
            headers:{
                'Content-Type':'application/json'
              }
            }

            const body = JSON.stringify({formData});
           
            const res = await axios.post('/api/user/update-bank-details',body,config);
            setAlert(res.data.msg,'success');
            fetchBankDetails();
        }catch(err){
            console.log(err.message);

        }
        
    }


    

  return (
    <div className='col-sm-12 justify-content-center'> 
        <div className='card shadow-md' style={{
            borderRadius: '10px',
        }}>

            {
                isloading ?
                <div className='d-flex justify-content-center'>
                    <img src={loader} alt='loader' style={{width:'100px'}}/>
                </div>
                    :
            <div className='card-body col-sm-8'>
                <Alerts />
                <div className='row'>
                
                    <div className='col-sm-12'>
                    
                        <h4 className='text-center'>Bank Details</h4>
                    </div>
                    </div>
                <table className='table table-borderless'>
                    <tbody className='basicDetailTable'>
                        <tr>
                            <td>
                                <span>Account No</span>
                            </td>
                            <td> <input type='text'  className=' form-control-md validate' name='accountNo' value={accountNo} onChange={e=>{
                                onChange(e)
                            }} onBlur={e=>{
                                accountNoCheck(e)
                            }} disabled={isdisabled} required={true}  /> </td>    
                        </tr> 

                        <tr>
                            <td>
                                <span>IFSC CODE</span>
                            </td>
                            <td> <input type='text' className=' form-control-md validate' name='ifsc' value={ifsc} onChange={e=>{
                                onChange(e)
                            }} disabled={isdisabled} required={true} /> </td>    
                        </tr>  

                        <tr>
                            <td>
                                <span>BRANCH NAME</span>
                            </td>
                            <td> <input type='text' className=' form-control-md validate' value={branchName} name='branchName' onChange={e=>{
                                onChange(e)
                            }} disabled={isdisabled} required={true} /> </td>    
                        </tr> 

                        <tr>
                            <td>
                                <span>BANK NAME</span>
                            </td>
                            <td> <input type='text' className=' form-control-md validate' value={bankName} name='bankName' onChange={e=>{
                                onChange(e)
                            }} disabled={isdisabled}  required={true}/> </td>    
                        </tr>  

                        <tr>
                            <td>
                                <span>CITY</span>
                            </td>
                            <td> <input type='text' className=' form-control-md validate' value={branchCity} name='branchCity' onChange={e=>{
                                onChange(e)
                            }} disabled={isdisabled} required={true}/> </td>    
                        </tr>  

                        <tr>
                            <td>
                                <span> STATE</span>
                            </td>
                            <td> <input type='text' className=' form-control-md validate' value={branchState} name='branchState' onChange={e=>{
                                onChange(e)
                            }}disabled={isdisabled}required={true} /> </td>    
                        </tr>  
                        
                        

                        <tr>
                            <td>
                                <span>UPI ID</span>
                            </td>
                            <td> <input type='text' name='upiId' className=' form-control-md validate' value={upiId} onChange={e=>{
                                onChange(e)
                            }} disabled={isdisabled}required={true} /> </td>    
                        </tr>  
                        <tr >
                            <td className='ml-5'>
                            {
                                isExist?
                                <button className='btn btn-block col-sm-12 btn-outline' onClick={e=>{
                                    setIsdisabled(false);
                                }}>Edit</button>:null
                            }
                            </td>
                            <td>
                                <button  onClick ={
                                e=>{
                                    onSubmit()
                                }
                            } className='btn btn-block col-sm-6  orange darken-2'>Submit</button></td>
                        </tr>

                    </tbody>
                </table> 
                
             </div>  
             
            }

           
        </div>

   </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    alert: state.alert
})

export default  connect( mapStateToProps,{setAlert} )(BankDetailsCard)