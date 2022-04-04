import React from 'react';


const SingleTransactionCard = ({
    date,firstGenEarn,secondGenEarn,thirdGenEarn,paymentStatus
}) =>{ return(
    <div className='card bg-light shadow-lg ' key={date} style={{
        borderRadius:'1rem',
        border:'1px solid #fff'
    }}>
        
        <div className='card-body'>
            <div className='row'>
                <div className='col-sm-12'>
                <p>
                    <span className='text-muted'>Date : </span>
                    <span className='text-dark'>{date}</span>
                </p>
                <hr/>
                </div>
                <div className='col-sm-4'>
                    <span className='text-muted'>First Gen Earn : </span>
                    <span className='text-dark'>{firstGenEarn}</span>
                </div>
                <div className='col-sm-4'>
                    <span className='text-muted'>Second Gen Earn : </span>
                    <span className='text-dark'>{secondGenEarn}</span>
                </div>
                <div className='col-sm-4'>
                    <span className='text-muted'>Third Gen Earn : </span>
                    <span className='text-dark'>{thirdGenEarn}</span>
                </div>
                <div className='col-sm-4'>
                    <span className='text-muted'>Total Earning : </span>
                    <span className='text-dark'>{firstGenEarn+secondGenEarn+thirdGenEarn}</span>
                </div>
                <div className='col-sm-4 offset-sm-4'> 
                <span className='text-muted'>Payment Status:</span>
                    <span className='text-dark'>{paymentStatus}</span>
                </div>    
            </div>
        </div>        

    </div>
);
}

export default SingleTransactionCard;