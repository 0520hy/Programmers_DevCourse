import React from 'react'
import { useLocation } from 'react-router-dom'

function Order() {
    const location = useLocation();
    const orderDataFromCart = location.state;
    console.log(orderDataFromCart)
  return (
    <div>
      order
    </div>
  )
}

export default Order
