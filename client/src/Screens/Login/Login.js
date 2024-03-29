import React,{Fragment, useEffect} from 'react';
import './login.css';
import Switch from 'react-switch';
import SignUp from './SignUp';
import bg from '../../assets/image/bg.jpg';
import { connect } from 'react-redux';
import Alerts from '../../Components/Alerts';
import {loadUser,signIn} from '../../action/auth';
import { setAlert } from '../../action/alert';
import { useNavigate } from 'react-router-dom';
import '../Wallet/userNavbar.css';
import {action as toggleMenu} from 'redux-burger-menu';
import  icon from '../../assets/image/icon.png';
import { Link} from 'react-router-dom';
import { faBars,faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({
    signIn,
    user,
    setAlert,
    toggleMenu,
    isAuthenticated,
    loadUser
}) => {

    const navigate = useNavigate();

    const [checked, setChecked] = React.useState(false);

    const [loginLoading, setLoginLoading] = React.useState(false);
    const handleChange = checked => {
        setChecked(checked);
    };

    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

        const onChange = (e) =>{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }


        const onSubmit = async (e) =>{
            e.preventDefault();
            setLoginLoading(true);
            
            if(username==="" || password===""){
                setAlert('Please fill all the fields','danger');
            }else{
               try{
                signIn({username,password});
                loadUser();
                
               }catch(err){
                   
                setLoginLoading(false);
                console.log(loginLoading)
                const errors = err.response.data.errors;
                if(errors){
                    errors.forEach(error => setAlert(error.msg,'danger'));
                }
                
               
                            
               }
            }
        }


        useEffect(() => {
            toggleMenu(false,'user');
      
        }, [])

        useEffect(()=>{
            setLoginLoading(false);
            if(isAuthenticated){
                
                navigate('/home');
            }
        },[isAuthenticated,loginLoading])
        
  return (
    <Fragment>
  

    <div className="container-fluid login-page" style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}>


    <div className='row'>
    <div className="col-3">
        <Link to='/' className="text-light listItem"> <img src={icon} alt="logo" style={{
            height: '5rem',
            width: '5rem'
        }} /></Link> 
    </div>
    <div className="col-9 text-right text-dark">
        <ul className="leftNav mt-3">
           
            <li> <Link to='/wallet' className="text-light listItem"><FontAwesomeIcon icon={faWallet} /></Link> </li>
            
        </ul>
    </div>
    </div>

        <div className="row" >
            <div className='col-sm-12'> 
               
            </div>

            <div className="col-md-5 ml-auto pb-5">
                
                <div className="card " style={{
                    backdropFilter: 'blur(16px) saturate(180%)',
                    backgroundColor: 'rgba(17, 25, 40, 0.75)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                    paddingBottom:'2rem'
                }}>
                    <div className="card-header text-center" style={{
                        borderBottom: 0,
                    }}> <span className='text-light p-2 mt-1'style={{
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                        marginTop:'-10px'
                    }}>Login</span> 
                    <Switch onChange={handleChange} checked={checked} 
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={15}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                    
                    
                    /> <span className='text-light p-2' style={{
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                        marginTop:'-10px'
                    }}>Sign Up</span> </div>
                    {
                     checked ?   <SignUp /> :
                     <Fragment>
                    <div className='card-header text-center' style={{
                        borderBottom:0,
                    }}>
                    <h3 style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '2em',
                        color: '#00bcd4',
                        textTransform: 'uppercase',
                    }}>LOGIN</h3>
                    </div>    
                    <div className="card-body mx-auto col-sm-12">

                        
                
                            <div className="input-container">
                                <input type="text" required="" name='username' value={username} onChange={
                                    (e)=>{
                                        onChange(e)
                                    }
                                } className='validate'/>
                                <label style={{
                                    fontSize: '1.2em',
                                }}>Username</label>		
                            </div>
                            <div className="input-container mt-2">		
                                <input type="password" required="" name='password' value={password} onChange={
                                    (e)=>{
                                        onChange(e)
                                    }
                                } className='validate'/>
                                <label style={{
                                    fontSize: '1.2em',
                                }}>Password</label>
                            </div>
                            
                            <div className="form-group form-check mt-2">
                                <input type="checkbox" className="form-check-input" id="remember"/>
                                <label className="form-check-label text-light" htmlFor="remember">Remember me</label>
                            </div>
                            <div className='text-center mt-5'>
                            
                            {
                                loginLoading ? <button  className='waves-effect waves-light btn deep-orange daken-1'  style={{
                                    background: '#F56812 0% 0% no-repeat padding-box',
                                    borderRadius: '43px',
                                    width: '200px',
                                    height: '45px',
                                    opacity: '1'
                                }} 
                                
                                > <i className='spinner-border text-light text-center' role='status'></i> </button>:
                                <button  className='waves-effect waves-light btn deep-orange daken-1'  style={{
                                    background: '#F56812 0% 0% no-repeat padding-box',
                                    borderRadius: '43px',
                                    width: '200px',
                                    height: '45px',
                                    opacity: '1'
                                }} 
                                onClick={e=>{
                                    onSubmit(e)
                                }}
                                >Login</button>
                                
                            }
                             
                            </div>
                            <div className='text-center mt-2'>
                            <a href='#' className='text-light' onClick={
                                e=>{
                                    navigate('/forget-password')
                                }
                            }>
                                Forget Password ?
                            </a>
                            </div>

                            <div className='text-center mt-5 '>
                                <Alerts />
                            </div>
                    
                    </div>

                    </Fragment>   

                    }
                 </div>
              </div>
        </div>
    </div>   
    </Fragment>                     
  );
};

Login.propTypes = {};

const mapStateToProps = state => ({

        
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    
});

export default connect(mapStateToProps,{signIn,setAlert,loadUser,toggleMenu})(Login);
