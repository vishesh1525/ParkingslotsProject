import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import {
  About,
  AddSlot,
  Contact,
  CustomerForm,
  Dashboard,
  LogIn,
  ParkingView,
  Payment,
  Success,
  VehicleForm,
  ReservationForm,
  Logout,
  Adminsection,
  Reservations,
  ForgotPassword,
  ResetPassword,
  
} from './index.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='login' element={<LogIn />} />
      <Route path='logout' element={<Logout />} />
      <Route path='contact' element={<Contact />} />
      <Route path='signup' element={<CustomerForm />} />
      <Route path='about' element={<About />} />
      <Route path='vehicleRegistration' element={<VehicleForm />} />
      <Route path='parkingSpots' element={<ParkingView />} />
      <Route path="forgot" element={<ForgotPassword/>}/>
      <Route path="reset" element={<ResetPassword/>}/>
      <Route path="Reservations2" element={<Reservations/>}/>
      <Route path='parkingSpots/reservation/:spotNumber' element={<ReservationForm />} />
      <Route path='/Adminlogin' element={<Adminsection />} />
      <Route path='payment/:spotNumber' element={<Payment />} />
      <Route path='AddSlot' element={<AddSlot />} />
      <Route path='/payment/success' element={<Success />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
