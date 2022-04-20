import React, { Fragment,useEffect,useState } from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Convert } from 'mongo-image-converter';
import TransactionCard from './TransactionCard'; 
import {walletReqSubmit} from '../../action/wallet';
import { setAlert } from "../../action/alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  {loadUser } from '../../action/auth';

import QR from '../../assets/image/QR.png';
import axios from 'axios';
const WalletCard = ({
    auth:{ user,loading },
    walletReqSubmit,
    setAlert,
    loadUser,
    wallet : {msg,transactions}
}) => {

    useEffect(() => {
        loadUser();
    }, []);


    const [cities,setCities] = useState([]);
    const [currentCity,setCurrentCity] = useState('');

    const [formData,setFormData]=useState({
        amount:'',
        upiId:'',
        upi:'',
        country:'',
        state:'',
        city:'',
        paySlip:'',
        remarks:''
    });

    const {
        amount,
        upiId,
        upi,
        country,
        state,
        city,
        paySlip,
        remarks,
    } = formData;


    let stateName = "";
    

    const onChangeHandler = e =>
    { setFormData({...formData,[e.target.name]:e.target.value})
       if(e.target.name==='state'){
        
        stateName = e.target.value;
        
        
        getCities();
       }
};

    const onFileUpload = async(e) => {
        try{
            const file = e.target.files[0];
            const val = await Convert(file);
            if(val){
              
            setFormData({...formData,[e.target.name]:val});
            }else{
                console.log('error');
            }
        }catch(err){
            console.log(err);
        }
        
    }

    const getCities = async(e) => {
        try{
            const body = {
                country:"India",
                state:stateName
            }
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }


            const res = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities',body,config);
            setCities(res.data.data);
        }catch(err){
            console.log(err);
        }
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        
        try{
            walletReqSubmit({
             amount,upiId,upi,country,state,city,paySlip,remarks
            });
            setAlert('Wallet request submitted successfully', 'success');
            setFormData({
                amount:'', upiId:'', upi:'', country:'', state:'', city:'', paySlip:'', remarks:''
            });
            loadUser();
        }catch(err){
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => setAlert(error.msg,'danger'));
            }
            setFormData({
                amount:'', upiId:'', upi:'', country:'', state:'', city:'', paySlip:'', remarks:''
            });
        }
    }


    return(
        <Fragment>
    <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-right">
                         
                          <span  onClick={()=>loadUser()}>  <i className="fa-solid fa-2x fa-refresh " style={{
                              cursor:'pointer'
                              
                          }} ></i>    </span>   
                    </div>
                </div>
            </div>            
           { !user.isEnrolled ?
           ( <Fragment>
            
            <div className='col-sm-6 col-md-9'>
             
                    
        { user.isWalletPaid  ? (user.isWalletApproved ?  <div className ='card'> 
        <div className='card-body'>
        <h5>Your wallet request has been approved. Please enroll. <Link to='/enroll' className="badge badge-pill badge-info">Enroll Now</Link> </h5>
            </div>
        </div>  : (
        <div className ='card'>
        <div className='card-body'>
        <h5>    Your wallet request has been recevied. Refrence ID : <span className="text-success">
          {user.wallet.paymentId}  </span> </h5>
        <strong>Please wait for approval</strong>
            </div>
        </div>) ) : 
              

                <div className="card bg-light rounded">

                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label for="reqAmount">Amount</label>
                                <select className="form-control" id="reqAmount"  name="amount" value={amount} onChange={(e)=>{
                                    onChangeHandler(e)
                                }} >
                                    <option>Select Amount</option>
                                    <option>999</option>
                                    <option>1199</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>TRANSACTION REFERENCE ID</label>
                                <input type="text" className="form-control" id="upi" aria-describedby="upi" value={upiId} name="upiId" onChange={(e)=>{
                                    onChangeHandler(e)
                                }} placeholder="Enter REFERENCE ID" />
                                <select className="form-control" id="upi" name="upi" value={upi} onChange={(e)=>{
                                    onChangeHandler(e)
                                }}>
                                    <option>Select PAYMENT GATEWAY</option>
                                    <option value="phonepe">Phonepe</option>
                                    <option value="paytm">Paytm</option>
                                    <option value="googlePay">Google Pay</option>
		                    <option value="other">OTHER</option>
                                </select>
                            </div>


                            <div className="form-inline">
                                <div className="form-group">
                                    <select className="form-control" name="country" value={country} onChange={(e)=>{
                                        onChangeHandler(e)
                                    }} >
                                        <option>Select Country</option>
                                        <option>India</option>
                                        
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="state"  onChange={(e)=>{
                                        onChangeHandler(e)

                                    }} >
                                        <option>Select State</option>
                                        <option value="Andaman">Andaman</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>


                                     </select>
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="city" value={city} onChange={(e)=>{
                                        onChangeHandler(e)
                                    }} >
                                        <option>Select City</option>
                                        {
                                            cities.map(city=>{
                                                return(
                                                    <option key={city} value={city}>{city}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>                    
                             </div>   

                             <div className="form-group">
                                <label htmlFor="paySS">Upload Pay Slip</label>
                                <input type="file" className="form-control" id="paySS" onChange={(e)=>{onFileUpload(e)}} name="paySlip" />
                                <small id="paySS" className="form-text text-muted">
                                    Please upload your pay Screenshot.
                                </small>
                              </div>
                             <div className="form-group">
                                 <label htmlFor="remarks">Remarks</label>
                                 <textarea className="" name="remarks" rows={3} value={remarks}
                                 onChange={
                                     (e)=>{
                                            onChangeHandler(e)
                                     }
                                 }
                                 >
                                </textarea> 
                             </div>        

                                



                        </form>    
                    </div>    
                    <div className="card-footer">
                        <button className="btn btn-success btn-block orange darken-2" onClick={(e)=>{
                            onSubmitHandler(e)
                        }}>Submit</button>
                    </div>
                </div>

                 }      
            </div>
            <div className="col-sm-6 col-md-3">
                <div className="card bg-light rounded py-2">
                    <div className="card-body my-4 py-5">
                    {
                        !user.isWalletPaid ?
                        <img src={QR} className='img-fluid' /> :

                        <VerticalTimeline layout={"1-column-left"} lineColor="#000" 
                            
                        >
                            <VerticalTimelineElement 
                                position="right"
                                className="vertical-timeline-element"
                                iconStyle={{  background: ( user.isWalletPaid ? ' green': '#fff'), color: '#fff',height:'2em',width:'2em',marginLeft:'.4rem' }}
                                icon={<i className="fa fa-dot" />}
                                contentStyle={{
                                        width: '80%',
                                        height: '100%',
                                        padding: '0px',
                                        paddingRight:'1rem',
                                        marginRight:'1rem',
                                        textAlign: 'center',
                                        
                                }}
                                
                            >
                                <p>
                                    Credit Requested
                                </p>

                            </VerticalTimelineElement>
                            <VerticalTimelineElement 
                                position="right"
                                className="vertical-timeline-element"
                                iconStyle={{  background: ( user.isWalletPaid ? ' green': '#fff'), color: '#fff',height:'2em',width:'2em',marginLeft:'.4rem' }}
                                icon={<i className="fa fa-dot" />}
                                contentStyle={{
                                        width: '80%',
                                        height: '100%',
                                        padding: '0px',
                                        textAlign: 'center',
                                        paddingRight:'1rem',
                                        marginRight:'1rem',
                                        
                                        
                                }} >
                                <p>
                                    Request Pending
                                </p>

                            </VerticalTimelineElement>

                            <VerticalTimelineElement 
                                position="right"
                                className="vertical-timeline-element"
                                iconStyle={{ background:(user.isWalletApproved ? 'green':'#fff' ), color: '#fff',height:'2em',width:'2em',marginLeft:'.4rem' }}
                                icon={<i className="fa fa-dot" />}
                                contentStyle={{
                                        width: '80%',
                                        height: '100%',
                                        padding: '0px',
                                        textAlign: 'center',
                                        paddingRight:'1rem',
                                        marginRight:'1rem',
                                        
                                }}>
                                <p>
                                    Credit Approved
                                </p>

                            </VerticalTimelineElement>
                        </VerticalTimeline>    
    }
                    </div>
                </div>    
             </div> 

             </Fragment>
        ):null}


  
             <div className='col-sm-12 my-5 py-5'>
                 {
                     transactions.length > 0 &&
                     <TransactionCard /> 
                 }

             </div>
             
        </Fragment>
    );


}

const mapStateToProps = (state)=>{
    return{
        auth:state.auth,
        wallet : state.wallet
    }
}
export default connect(mapStateToProps,{setAlert,walletReqSubmit,loadUser})(WalletCard);
