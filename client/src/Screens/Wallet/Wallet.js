import React,{useEffect} from 'react';
import {connect } from 'react-redux';
import UserNavbar from './UserNavbar';
import WalletCard from './WalletCard';
import Alerts from '../../Components/Alerts';
import {loadUser} from '../../action/auth';
import {Navigate} from 'react-router-dom';
import TransactionCard from './TransactionCard';
import Footer from '../components/Footer';
const Wallet = ({loadUser,auth:{user,isAuthenticated}}) => {

    useEffect(() => {
        loadUser();
    }, []);

    if(!isAuthenticated){
        return <Navigate to='/'/>
            }
    return (
        <div className='container-fluid' style={{
            backgroundColor:'#F56812',
            
        }}>
            
            <div className='row'>
                <UserNavbar />
             </div>
             <div className='row justify-content-md-center'>
                <div className='col-sm-6 justify-content-md-center'>
                    <Alerts />
                </div>
                <WalletCard />

             </div>  

             <div className='row justify-content-md-center'>
                {
                    user.isEnrolled ? <TransactionCard /> : null
                }
              </div>
              <Footer />     
        </div>        
    )
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,{loadUser})(Wallet);