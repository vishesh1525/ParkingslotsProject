import React from 'react'

import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import { About, CustomerForm, Dashboard, LogIn, ParkingView, VehicleForm } from './index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={Layout}>
      <Route index element={<Dashboard />} />
      <Route path='login' element={<LogIn />} />
      {/* <Route path='logout' element={</>} /> */}
      <Route path='signup' element={<CustomerForm />} />
      <Route path='about' element={<About />} />
      <Route path='vehicleRegistration' element={VehicleForm} />
      <Route path='parkingSpots' element={<ParkingView />} />

    </Route >
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
