import React, {useEffect,Fragment } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import  {store} from './store';

import Home from './Screens/Home/Home';
import Loader from './Components/Loader';
import {Route, Routes} from 'react-router';
import {BrowserRouter as Router,withRouter} from 'react-router-dom';

import NotFound from './Components/NotFound';
import Login from './Screens/Login/Login';
import RegisteredHome from './Screens/Home/RegisteredHome';
import Wallet from './Screens/Wallet/Wallet';
import Dashboard from './Screens/Dashboard/Dashboard';
import Profile from './Screens/Profile/Profile';
import Enrollment from './Screens/EnrollmentForm/Enrollment';
import Grivances from './Screens/Grivances/Grivances';
import ForgetPassword from './Screens/Login/ForgetPassword';
import Sidebar from './Components/Sidebar';
import GrivancesList from './Screens/Grivances/GrivancesList';
import { loadUser } from './action/auth';
import setUserAuthToken from './utils/setUserAuthToken';
import { connect } from 'react-redux';
import KYCRequest from './Admin/KYCRequest/KYCRequest';
import SingleUserKYC from './Admin/KYCRequest/SingleUserKYC';
import Admin from './Admin/Admin';
import WalletRequest from './Admin/WalletRequest/WalletRequest';
import SingleUserInfo from './Admin/UserInfo/SingleUserInfo';
import DailyPayout from './Admin/DailyPayout/DailyPayout';
import Classes from './Admin/Zoom/Classes';
import Notice from './Admin/Notice/Notice';
import UserDetailCards from './Admin/KYCRequest/UserDetailCards';
import AdminLogin from './Admin/Login/AdminLogin';
import SinglePayout from './Admin/DailyPayout/SinglePayout';
import Testimonial from './Admin/Testimonial/Testimonial';
import SingleGrivances from './Screens/Grivances/SingleGrivances'

import AdminGrivancesList from './Admin/Grivances/AdminGrivancesList';
import AdminSingleGrivances from './Admin/Grivances/AdminSingleGrivances';

if(localStorage.token){
  setUserAuthToken(localStorage.token);

}


const  App = ({
  
}) => {

  

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  

  
  return (
    <Provider store={store}>
          
      
      <Router>
      <Sidebar />
        <Routes>
          <Route path='/' element={<Home/>}   />
          <Route path='/login' element={<Login/>}   />
          <Route path='/home' element={<RegisteredHome/>}   /> 
          <Route path='/wallet' element={<Wallet/>}   /> 
          <Route path="/dashboard" element={<Dashboard/>} /> 
          <Route path="/profile" element={<Profile/>} /> 
          <Route path="/enroll" element={<Enrollment />} /> 
           <Route path="/submit-grivances" element={<Grivances />} /> 
           <Route path="/grivances" element={<GrivancesList />} /> 
           <Route path="/grivances/:referenceId" element={<SingleGrivances/>} /> 
          <Route path="/forget-password" element={<ForgetPassword />} /> 

          <Route path="/admin" element={<Admin />} />
          <Route path='/admin/kyc-request' element={<KYCRequest />}   />
          <Route path='/admin/pending-wallet-request' element={<WalletRequest />}   />
          <Route path='/admin/user-info/:id' element={<SingleUserInfo />}   />
          <Route path='/admin/daily-payout' element={<DailyPayout />}   />
          <Route path='/admin/daily-payout/:date' element={<SinglePayout />}   />
          <Route path='/admin/classes' element={<Classes />}   />
          <Route path='/admin/add-testimonial' element={<Testimonial />} />
          <Route path='/admin/notice' element={<Notice />}   />
          <Route path='/admin/kyc-request/user/:id' element={<UserDetailCards />}   />
          
          <Route path="/admin/grivances" element={<AdminGrivancesList />} /> 
           <Route path="/admin/grivances/:referenceId" element={<AdminSingleGrivances/>} /> 
          <Route path='/admin/login' element={<AdminLogin />}   />
          
          <Route path='*' element={<NotFound/>}   />
        </Routes>
      </Router>
    
    </Provider>


  );
}



export default App;