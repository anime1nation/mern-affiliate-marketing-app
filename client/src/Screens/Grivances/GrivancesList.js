import React,{useState,useLayoutEffect} from 'react'
import Footer from '../components/Footer'
import UserNavbar from '../Wallet/UserNavbar'
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/image/loader.gif';
const GrivancesList = () => {


    const[grivances,setGrivances]=useState([]);
    const [isloading,setIsLoading]=useState(true);
    const navigate=useNavigate();
    const fetchGrivances = async()=>{
        try{
            const res = await axios.get('/api/user/grivance-list')
            setGrivances(res.data.grivanceList);
            console.log(res.data);
            setIsLoading(false);
        }catch(err){
                console.log(err.message);
        }
    }

    

    useLayoutEffect(() => {
        let isMounted= true;
        setTimeout(() => {
            if(isMounted){
                fetchGrivances();
            }
        }, 1000);
    },[]);

  return (
    <div className='container-fluid ' style={{
        padding:0
    }}>
        <div className='row'style={{
        backgroundColor: '#F56812',
        padding:0,
    }}>
            <UserNavbar />

        </div>

        {
            isloading ? 
            <div className='row mt-5'>
                    <div className='col-sm-12 text-center'>
                        <img src={loader} />
                    </div>    
             </div>   :
             <div className='row mt-5'>
            
             <div className='col-sm-6'> <p> <strong>Your Submitted Grivances</strong></p> </div>
             <div className='col-sm-6 text-right mb-2'> <button className='btn btn-primary' onClick={e=>{
                 navigate('/submit-grivances')
             }}>Submit Grivnaces</button> </div>
             
 
 
 
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
                             grivances.map(grivance=>(
                                 <tr key={grivance._id}>
                                     <td>{grivance.category}</td>
                                     <td>{grivance.subject}</td>
                                     <td>{moment(grivance.date).format('DD-MM-YYYY hh:mm')}</td>
                                     <td>{grivance.status}</td>
                                     <td> <button className='btn btn-primary' onClick={e=>{
                                         navigate(`/grivances/${grivance.referenceId}`)
                                     }}  >View</button> </td>
 
                                 </tr>    
                                     ))
                         }
                         
                     </tbody>       
 
                 </table>    
 
             </div>     
         </div>
        }

        
        

    </div>
  )
}

export default GrivancesList