import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout
