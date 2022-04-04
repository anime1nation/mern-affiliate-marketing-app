import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {v4 as uuidv4} from 'uuid';
import { loadDownline } from '../../action/dashboard';
 const SingleProfileCard = ({
     avatar,username,userid,loadDownline
 }) => {

  return (
    
        <div>
            
        </div>  
    
  )
}

const mapStateToProps = state => ({
    userDownline: state.dashboard.userDownline,
    downline : state.dashboard.downline,
});

export default connect(mapStateToProps,{loadDownline})(SingleProfileCard);