import React from 'react';
import PropTypes from 'prop-types';
import icon  from '../../assets/image/icon.png'
import { Link } from 'react-router-dom';
import { faBars,faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const HomeNavbar = ({
    alerts
}) =>
{
return(
        
<nav className="navbar navbar-expand-lg col-sm-12  navbar-transparent bg-transparent"
style={{
    padding:0,
    margin:0,
}}
>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto  mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                  <img src={icon} alt="logo" style={
                        { width: '80px', height: '80px' }
                  } className="logo"/>
                   <span className="sr-only">(current)</span></a>
            </li>
         
          </ul>
          <div className="social-part mr-lg-5">
            <ul className=''>
                <li style={{listStyle:'none'}}>
                    <Link to='/login' className=''>
                        <FontAwesomeIcon icon={faWallet} /> 
                    </Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
)
};

export default HomeNavbar;
