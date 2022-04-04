import React from 'react'
import PropTypes from 'prop-types'
import DetailCard from './DetailCard'
import { connect } from 'react-redux'
const DetailCardGroup = ({
    user
}) => {
    const {totalFirstGenEarning,totalSecondGenEarning,totalThirdGenEarning,firstGenCount,secondGenCount,thirdGenCount,dayEarning} = user;
    
    const totalEarning = totalFirstGenEarning+totalSecondGenEarning+totalThirdGenEarning;
    const totalLead = firstGenCount+secondGenCount+thirdGenCount;


  return (
      <div className='col-md-6'>
          <div className='row'>
              <div className='col-md-6'>
                  <DetailCard bg={"#6610f2"} title={"Total Lead"} text={totalLead} />
              </div>
              <div className='col-md-6'>
                  <DetailCard bg={"#fd7e14"} title={"Total Income"} text={totalEarning} />
              </div>

              <div className='col-md-6'>
                  <DetailCard bg={"#6610f2"} title={"1st Gen Lead"} text={firstGenCount} />
              </div>
              <div className='col-md-6'>
                  <DetailCard bg={"#fd7e14"} title={"1st Gen Income"} text={totalFirstGenEarning} />
              </div>

              <div className='col-md-6'>
                  <DetailCard bg={"#6610f2"} title={"2nd Gen Lead"} text={secondGenCount} />
              </div>
              <div className='col-md-6'>
                  <DetailCard bg={"#fd7e14"} title={"2nd Gen Income"} text={totalSecondGenEarning} />
              </div>

              <div className='col-md-6'>
                  <DetailCard bg={"#6610f2"} title={"3rd Gen Lead"} text={thirdGenCount} />
              </div>
              <div className='col-md-6'>
                  <DetailCard bg={"#fd7e14"} title={"3rd Gen Income"} text={totalThirdGenEarning} />
              </div>
          </div>
      </div>
  )
}
 
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,null)(DetailCardGroup);