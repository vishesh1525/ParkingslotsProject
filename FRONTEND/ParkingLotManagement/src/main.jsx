import React from 'react'

import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
<<<<<<< HEAD
import Contact from './components/Contact/Contact.jsx' 
import CustomerForm from './components/SmallReusableComponents/CustomerForm.jsx'
import LogIn from './components/SmallReusableComponents/LogIn.jsx'

=======
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Signup from './components/Signup/Signup.jsx'
>>>>>>> c4c30e7c7db74255b3eeee65f9c8ef46a4b3068e
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
<<<<<<< HEAD
      }, 
      {
        path:"logIn",
        element:<LogIn></LogIn>
      },
      {
        path:"Register",
        element:<CustomerForm/>
      }
    ]
=======
      },
      {
        path:"Parking View",
        element:<Contact/>
      }
      
    ],
    
  },
  {
    path:"Register",
    element:<Signup/>
>>>>>>> c4c30e7c7db74255b3eeee65f9c8ef46a4b3068e
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
