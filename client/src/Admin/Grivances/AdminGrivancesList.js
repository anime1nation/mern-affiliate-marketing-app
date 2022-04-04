import React,{useState,useEffect} from 'react'
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import axios from 'axios';
import moment from 'moment';
import {loadAdmin} from '../../action/admin';
import { useNavigate } from 'react-router-dom';
import {setAlert} from '../../action/alert'
import {connect} from 'react-redux';
const AdminGrivancesList = ({
    loadAdmin
}) => {


    const[grivances,setGrivances]=useState([]);
    const navigate=useNavigate();
    const fetchGrivances = async()=>{
        try{
            const res = await axios.get('/api/admin/grivance-list')
            setGrivances(res.data.grivanceList);
            console.log(res.data);
        }catch(err){
                console.log(err.message);
        }
    }

    const onChange = async(e)=>{
        const statusType = e.target.value;
        
        if(statusType==='all'){
            fetchGrivances();
        }else{
            try{
                 const res = await axios.get(`/api/admin/grivances/${statusType}`)
                 
                 setGrivances(res.data);
                 


            }catch(err){
                console.log(err.message);
            }
        }
    }

    useEffect(() => {
        let isMounted= true;
        setTimeout(() => {
            if(isMounted){
                loadAdmin();
                fetchGrivances();
            }
        }, 1000);
    },[]);

  return (
    <div className='container-fluid ' style={{
        padding:0
    }}>
        <AdminSidebar />
        <div className='row'style={{
        backgroundColor: '#F56812',
        padding:0,
    }}>
            <AdminNavbar />

        </div>
        <div className='row mt-5'>

            <div className='col-sm-6'> <p> <strong> Submitted Grivances</strong></p> </div>
            <div className='col-sm-6'> 
                <div className='form-group'>
                        <select className='form-control' id='exampleFormControlSelect1' onChange={e=>{
                            onChange(e);
                        }} name='statusType' >
                            <option value='all'>All</option>
                            <option value='pending'>Pending</option>
                            <option value='accepted'>Approved</option>
                            <option value='rejected'>Rejected</option>
                            <option value='closed'> Closed </option>
                        </select>
                 </div>   
            </div>



            <div className='col-sm-12'>
                <table className='table table-striped table-hover'>

                    <thead>
                        <tr>

                            <th>
                               <strong>Category</strong>
                            </th>
                            <th>
                                <strong>Subeject</strong>
                            </th>
                            
                            <th>Date</th>
                            <th>
                                Status
                            </th>
                            <th></th>

                        </tr>
                    </thead> 
                    <tbody>
                        {
                           grivances && grivances.map(grivance=>(
                                <tr key={grivance._id}>
                                    <td>{grivance.category}</td>
                                    <td>{grivance.subject}</td>
                                    <td>{moment(grivance.date).format('DD-MM-YYYY hh:mm')}</td>
                                    <td>{grivance.status}</td>
                                    <td> <button className='btn btn-primary' onClick={e=>{
                                        navigate(`/admin/grivances/${grivance.referenceId}`)
                                    }}  >View</button> </td>

                                </tr>    
                                    ))
                        }
                        
                    </tbody>       

                </table>    

            </div>     
        </div>

        
        

    </div>
  )
}

export default connect(null,{loadAdmin})(AdminGrivancesList)