import React,{useEffect} from 'react';
import SingleTransactionCard from './SingleTransactionCard';
import { connect } from 'react-redux';
import loader from '../../assets/image/loader.gif';
import txnribbon from '../../assets/image/txnribbon.png';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './txnCard.css';
import axios from 'axios';
const TransactionCard = ({
    auth:{user},
}) => {
    const[transactions,setTransactions] = React.useState([]);
    const [loading,setLoading] = React.useState(true);

    const loadTransactions = async () => {
        try{
            const res = await axios.get(`/api/user/latest-transactions`);
            setTransactions(res.data.dayEarning);
          
            setLoading(false);
        }catch(err){
            setLoading(true);
            console.log('Error');
        }   
    }

    useEffect(() => {
        loadTransactions();
    }, []);


    return(
        <div className='col-sm-12 shadow' style={{
            backgroundColor:'#E3E3E3',
            borderRadius:'20px',
        }}>
            <div className='row mb-3'>
                <div className='col-sm-12'>
                   { 
                          loading ?
                            <div className='loader' style={{
                                position:'absolute',
                                left:'40%',
                                top:'40%'
                            }}>
                                <img src={loader} />
                                <p>Loading Please Wait ....</p>
                            </div> :
                      ( <div className='row'>
                          <div className='col-sm-12'>
                            <img src={txnribbon} alt='txnribbon' className='img-fluid txn-ribbon'  />
                          </div> 
                                   
                    {
                          
                        transactions.length > 0 ?
                        transactions.map(transaction => (
                            
                            <SingleTransactionCard 
                            key={transaction._id}
                        date={transaction.earningDate}
                        firstGenEarn={transaction.firstGenDayEarning}
                        secondGenEarn={transaction.secondGenDayEarning}
                        thirdGenEarn={transaction.thirdGenDayEarning}
                        paymentStatus={transaction.isApproved ? 'Approved' : transaction.isDeclined ? 'Declined' : 'Pending'}
                    />)): <h4 className='text-center'>No transaction Yet</h4> 
                    
                    }
                    
                     </div> )
                   }

                   
                </div>
            </div>
        </div>


    );

}
const mapStateToProps = state => ({
    auth:state.auth
})
export default  connect(mapStateToProps,null)(TransactionCard);