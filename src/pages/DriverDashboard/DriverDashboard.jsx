import React from 'react'
import Booking from '../../components/Booking'
import BookingHist from '../../components/BookingHist'
import Rating from '../../components/Rating'
import './driverdashboard.css'
function DriverDashboard() {
  return (
    <div className='d-flex'>
        <Booking/>
        <div className='section-2'>       
        <BookingHist/>
        <Rating/>
        </div>

    </div>
  )
}

export default DriverDashboard