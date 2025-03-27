import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Footer from './components/Footer'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import TrackOrder from './pages/TrackOrder'
import Wallet from './pages/Wallet'
import Signup from './pages/Signup'
import OrderConfirmation from './pages/OrderConfirmation'
import Account from './pages/Account'
import Feedback from './pages/Feedback'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/track/:id' element={<TrackOrder />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/order-confirmation/:orderId' element={<OrderConfirmation />} />
          <Route path='/account' element={<Account />} />
          <Route path='/feedback' element={<Feedback />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
