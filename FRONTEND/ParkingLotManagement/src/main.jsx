import React from 'react'

import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx' 
import CustomerForm from './components/SmallReusableComponents/CustomerForm.jsx'
import LogIn from './components/SmallReusableComponents/LogIn.jsx'
import VehicleForm from './components/SmallReusableComponents/VehicleForm .jsx'
// import Signup from './components/Signup/Signup.jsx'
import Header from './components/Header2/Header.jsx'
import ParkingView from './components/ParkingView/ParkingView.jsx'

const router =createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      
      {
        path:"About",
        element:<About/>
      },
      {
        path:"Contact",
        element:<Contact/>
      }, 
      {
        path:"logIn",
        element:<LogIn></LogIn>
      },
      
      {
        path:"Register2",
        element:<VehicleForm/>
      },
      {
        path:"register",
        element:<CustomerForm/>
      },
      {
        path:"ParkingView",
        element:<ParkingView/>
      }
    ],
    
  },
  {
    path:"/Home",
    element:<Header/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
