import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate, Route } from 'react-router-dom';


export const PrivateRoute = ({
    component: Component,
    auth: {
        isAuthenticated,
        loading
    },
    
    ...rest
}) => (<Route {...rest} render={props => !isAuthenticated && !loading ? (<Navigate to='/login'/>) : (<Component {...props}/>)} />)



PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    auth: state.auth,

})



export default connect(mapStateToProps)(PrivateRoute)
