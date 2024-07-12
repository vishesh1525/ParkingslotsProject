import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import VehicleForm from './VehicleForm ';

const CustomerForm = () => {
  const [formValues, setFormValues] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    ph_no_1: '',
    ph_no_2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Customer form submitted:', formValues);
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)"><img src={logo} alt="logo" className='w-45 mb-8 mx-auto block rounded-lg' /></a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    name="fname" 
                    type="text" 
                    required 
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                    placeholder="First Name" 
                    value={formValues.fname} 
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <input 
                    name="lname" 
                    type="text" 
                    required 
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                    placeholder="Last Name" 
                    value={formValues.lname} 
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                  placeholder="Email" 
                  value={formValues.email} 
                  onChange={handleChange}
                />
              </div>
              <div>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                  placeholder="Password" 
                  value={formValues.password} 
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    name="ph_no_1" 
                    type="text" 
                    required 
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                    placeholder="Phone Number 1" 
                    value={formValues.ph_no_1} 
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <input 
                    name="ph_no_2" 
                    type="text" 
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                    placeholder="Phone Number 2" 
                    value={formValues.ph_no_2} 
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                {/* <VehicleForm/> */}
              </div>
              <div className="!mt-8">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">Already have an account? <Link to="/logIn" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Sign in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
