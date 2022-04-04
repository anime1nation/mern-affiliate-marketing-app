import React from 'react'
import PropTypes from 'prop-types'
//import uuidv4 from uuid
import {v4 as uuidv4} from 'uuid';

const DetailCard = ({
    bg,
    title,
    text
}) => {
  return (
    <div className='col-md-12 'key={uuidv4()}>
        <div className={'card shadow-lg text-center'} style={{
            backgroundColor:bg,
            color:'white',
            border:'1px solid #EBEBEB',
            borderRadius:'10px'
        }}>
            <h6>
                {title}
            </h6>
            <h6>
                {text}
            </h6>
         </div>   

    </div>
  )
}


export default DetailCard