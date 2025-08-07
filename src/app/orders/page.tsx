import Navbar from '@/components/Navbar'
import React from 'react'
import Footer from '../(home)/_components/Footer'
import OrderCard from './components/OrderHistory'
import OrderHistory from './components/OrderHistory'

const Orders = () => {
  return (
    <div className="bg-black min-h-screen">
        <Navbar />
        <OrderHistory />
        <Footer />
    </div>
  )
}

export default Orders;