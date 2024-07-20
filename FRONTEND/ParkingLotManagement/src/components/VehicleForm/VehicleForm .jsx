import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.svg';
import { useSelector } from "react-redux"
const VehicleForm = () => {
  const [vehicleCount, setVehicleCount] = useState(1);
  const [vehicles, setVehicles] = useState([{ username: '', license_plate: '', vehicle_type: '', make: '', model: '', color: '' }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleVehicleCountChange = (e) => {
    const count = parseInt(e.target.value);
    const updatedVehicles = Array(count).fill({ username: '', license_plate: '', vehicle_type: '', make: '', model: '', color: '' });
    setVehicleCount(count);
    setVehicles(updatedVehicles);
  };

  const handleVehicleChange = (index, key, value) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[index][key] = value;
    setVehicles(updatedVehicles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/v1/vehicles', vehicles, {
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Vehicle form submitted:', response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error submitting vehicle form:', error.response?.data?.message || error.message);
    }
    const navigate = useNavigate();
    const authStatus = useSelector((state => state.adminAuth.isAuthenticated))
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)"><img src={logo} alt="logo" className='w-45 mb-8 mx-auto block rounded-lg' /></a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Vehicle Details</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_count">Vehicle Count</label>
                <select 
                  name="vehicle_count" 
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  value={vehicleCount}
                  onChange={handleVehicleCountChange}
                >
                  {[1, 2, 3].map(count => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </div>
              {vehicles.map((vehicle, index) => (
                <div key={index} className="mt-4">
                  <h4 className="text-gray-800 text-lg font-bold">Vehicle {index + 1}</h4>
                  <div className="mt-2">
                    <input 
                      name={`username_${index}`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Enter the user name" 
                      value={vehicle.username} 
                      onChange={(e) => handleVehicleChange(index, 'username', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <input 
                      name={`license_plate_${index}`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Number - KA 05 1992" 
                      value={vehicle.license_plate} 
                      onChange={(e) => handleVehicleChange(index, 'license_plate', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <input 
                      name={`color_${index}`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Color" 
                      value={vehicle.color} 
                      onChange={(e) => handleVehicleChange(index, 'color', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <select 
                      name={`vehicle_type_${index}`} 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      value={vehicle.vehicle_type} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_type', e.target.value)}
                    >
                      <option value="" disabled>Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <select 
                      name={`make_${index}`} 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      value={vehicle.make} 
                      onChange={(e) => handleVehicleChange(index, 'make', e.target.value)}
                    >
                      <option value="" disabled>Vehicle Make</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="EV">EV</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <input 
                      name={`model_${index}`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Model" 
                      value={vehicle.model} 
                      onChange={(e) => handleVehicleChange(index, 'model', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <div className="!mt-8">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Submit Vehicle Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleForm;
