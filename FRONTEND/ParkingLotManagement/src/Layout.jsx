import React from 'react'
import {Outlet} from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Header2 from './components/Header2/Header'
import Navbar from './components/Header2/Components/Navbar/Navbar'
function Layout() {
  return (
    <div className="min-h-screen">
    <Navbar/>
    
    <Outlet/>
    
    </div>
  )
}

export default Layout
