import React from 'react'

import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
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
      }
    ]
  },
  {
    path:"/User",
    element:<User/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
