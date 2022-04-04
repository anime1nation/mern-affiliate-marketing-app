import React from 'react'
import moment from 'moment'

const MessageContainer = ({user,msg,dateTime}) => {
  if(user==='Admin'){
    return (
        
        <div className='col-sm-6' style={{
            borderRadius:'10px',
            backgroundColor:'#F56812',
        }}>
            <strong className='mt-2'>{user.toString().toUpperCase()}</strong>
            <p className='text-message' >{msg}</p>
            <p className='text-right'>{moment(dateTime).format('Do MMMM hh:mm a')}</p>
    
        </div>
      )
  }else{
    return (

        <div className='col-sm-6 offset-6' style={{
            borderRadius:'10px',
            backgroundColor:'#eaea2a',
        }}>
            <strong className='mt-2'>{user}</strong>
            <p className='text-message' >{msg}</p>
            <p className='text-right'>{moment(dateTime).format('Do MMMM hh:mm a')}</p>
    
        </div>
        
      )
  }
}

export default MessageContainer