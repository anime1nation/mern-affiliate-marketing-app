import React,{useEffect} from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import AdminSidebar from '../Components/AdminSidebar';
import {connect } from 'react-redux';
import {loadTransaction} from '../../action/admin';
import loader from '../../assets/image/loader.gif';
import SimpleBar from 'simplebar-react';
import { useNavigate } from 'react-router-dom';

import {action as toggleMenu} from 'redux-burger-menu';
const DailyPayout = ( {
    transactions,loadTransaction,loading,toggleMenu
} ) => {

    const navigate = useNavigate();

    useEffect(() => {
      loadTransaction();
      toggleMenu(false,'admin');
    }, [])

  return (
      
      loading  ?<div className='container-fluid'>
      <div className='row'>
          <AdminSidebar />
          <AdminNavbar />
          </div>
      <img src={loader} style={{
          position:'absolute',
          left:'40%',
          top:'40%'
      }}/>
  </div>     : (transactions.length < 1 ) ?
   <div className='container-fluid' style={{
       padding:'0',
   }}>
        <AdminSidebar />

        <div className='row'>
            <AdminNavbar />

        </div>
          <div className='row'>
        <div className='col-sm-12 text-right justify-content-right'><i className='fa-solid fa-refresh text-right fa-2x' style={{
                        cursor:'pointer'
                    }} onClick={
                       ()=>{
                        loadTransaction();
                    }}></i>
        </div>
        </div>
        <div className='row justify-content-md-center'>
            <div className='col-sm-12'>
                <h4 className='text-center'>No Transaction Yet</h4>
            </div>
        </div>

    </div>  :

    <div className='container-fluid' style={{
        padding:'0'
    }}>
        <AdminSidebar />

        <div className='row'>
            <AdminNavbar />
           <div className=' col-sm-12 text-right'><i className='fa-solid fa-refresh text-right fa-2x' style={{
                        cursor:'pointer'
                    }} onClick={
                       ()=>{
                        loadTransaction();
                    }}></i>
           </div>
        </div>   

        <div className='row'>
            <div className='col-sm-12'>
                <h5>Daily Payout</h5>
            <SimpleBar style={{ maxHeight: '30em' }}>
            <div className='row'>
                {
                    transactions[0].dayEarning.map(transaction => (

                            <div className='col-sm-2' onClick={e=>navigate(`/admin/daily-payout/${transaction.earningDate}`)}>


                                <i class="fas fa-folder-open fa-3x" style={{
                                    cursor:'pointer',
                                }}></i>
                                <p>{transaction.earningDate}</p>
                            </div>
                        ))


                }

            </div>

             </SimpleBar>
            </div>
        </div>
    </div>
    

  );
            }
            


const mapStateToProps = state => ({
    transactions : state.admin.transactions,
    loading : state.admin.loading

});

export default connect(mapStateToProps,{loadTransaction,toggleMenu})(DailyPayout);
