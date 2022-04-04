import React from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios';
import { setAlert } from '../../action/alert';
import Alerts from '../../Components/Alerts'; 
import { connect } from 'react-redux';
import { Fragment } from 'react/cjs/react.production.min';
const Classes = ({setAlert}) => {

    const [silverLink, setSilverLink] = React.useState('');
    const [goldLink, setGoldLink] = React.useState('');
    const [day, setDay] = React.useState('');
    

    const silverpackage  = () =>{
        try{
            //check if string contains zoom.com or meet.google
            if(silverLink.includes('zoom.com') || silverLink.includes('meet.google')){
                
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const body = JSON.stringify({
                link:silverLink,
                package:'silver',
                day:day
            });

            console.log(body);
            const res = axios.post('/api/admin/add-classes',body,config);
            
            setAlert('Class Added Successfully','success');
            setSilverLink('');
        }else{
            setAlert('Invalid Link','danger');
        }
        }catch(err){
            console.log(err);
        }
    }

    const goldpackage  = () =>{
        try{
            //check if string contains zoom.com or meet.google
            if(goldLink.includes('zoom.com') || goldLink.includes('meet.google')){
            
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const body = JSON.stringify({
                link:goldLink,
                package:'gold',
                day:day
            });
            const res = axios.post('/api/admin/add-classes',body,config);
            
            setAlert('Class Added Successfully','success');
            setGoldLink('');
        }else{
            setAlert('Invalid Link','danger');
        }
        }catch(err){
            console.log(err);
        }
    }

  return (
      <Fragment><AdminSidebar />
    <div className='container-fluid'>
         <div className='row'>
            <AdminNavbar />
            <Alerts />
         </div>   

         <div className='row'>
             <h6>Add Zoom Link</h6>
            <div className='col-sm-12'>
            <div className='form-group'> 

<select className='form-control' name='day' value={day} id='day' onChange={e=>{
    setDay(e.target.value); 
}} >
    <option value='monday'>Monday</option>
    <option value='tuesday'>Tuesday</option>
    <option value='wednesday'>Wednesday</option>
    <option value='thursday'>Thursday</option>
    <option value='friday'>Friday</option>
    <option value='saturday'>Saturday</option>
    <option value='sunday'>Sunday</option>
</select>

</div>
            </div>




                <div className='col-sm-6'>
                    
                    <h4>Silver Package</h4>
                    <textarea className='form-control' row={2} value={silverLink} onChange={
                        e => setSilverLink(e.target.value)
                    } >


                     


                    </textarea>
                    <button className='btn btn-primary' onClick={
                        e=>{
                            silverpackage();
                        }
                    }>Save</button>

               
                 </div>   

                 <div className='col-sm-6'>
                    <h4>Gold Package</h4>
                    <textarea rows={2} value={goldLink} onChange={
                        e => setGoldLink(e.target.value)
                    } >

                    </textarea>
                   
                    <button className='btn btn-primary' onClick={
                       e=>{
                           goldpackage();
                       }
                    } >Save</button>
                 </div>   
         </div>    
    </div>
    </Fragment>
  )
}

export default connect(null,{setAlert})(Classes);