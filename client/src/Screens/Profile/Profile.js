import React from 'react'
import ProfileCard from './ProfileCard';
import UserNavbar from '../Wallet/UserNavbar';
import BasicDetailCard from './BasicDetailCard';
import DocumentsCard from './DocumentsCard';
import BankDetailsCard from './BankDetailsCard';
import Footer from '../components/Footer';
import Alerts from '../../Components/Alerts';
const Profile = () => {
  return (
    <div className='container-fluid' style={{
        backgroundColor: '#F56812',
        padding:0,
        
    }}>
        <div className='row'>
            <UserNavbar />
            <div className='col-sm-12'>
            <Alerts />
            </div>
        </div>
        <div className='row px-3'>
            <div className='col-sm-6'>
                <ProfileCard />
                
            </div>   
            <div className='col-sm-6'>
                
                <BasicDetailCard />
            </div>   
        </div>
        <div className='row mt-5'>
                <DocumentsCard />
        </div>

        <div className='row mt-5'>
                <BankDetailsCard />
        </div>
        <Footer />
    </div>
  )
}

export default Profile