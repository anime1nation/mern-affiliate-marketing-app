import React from 'react';
import {Link} from 'react-router-dom';


const RoundedBtn = ({
    text,
    btnColor}) =>{

        return(
                <button className={`btn btn-rounded btn-lg text-light `}
                    style={{
                        backgroundColor:btnColor,
                        borderRadius:"25px",
                    }}
                > {text} </button>
        );
    }

export default RoundedBtn;