import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const VehicleForm = () => {
  const [vehicles, setVehicles] = useState([{ vehicle_number: '', vehicle_color: '', vehicle_type: '', vehicle_make: '' }]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = vehicles.map((vehicle, i) =>
      i === index ? { ...vehicle, [field]: value } : vehicle
    );
    setVehicles(updatedVehicles);
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { vehicle_number: '', vehicle_color: '', vehicle_type: '', vehicle_make: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Example saving logic (you might replace this with API call or state management)
    const vehicleDetails = { username, vehicles };
    console.log('Vehicle form submitted:', vehicleDetails);

    // Optionally save details in localStorage or context
    localStorage.setItem('vehicleDetails', JSON.stringify(vehicleDetails));

    // Navigate to the payment page
    navigate('/ParkingView');
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)">
            <img src={logo} alt="logo" className='w-45 mb-8 mx-auto block rounded-lg' />
          </a>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Vehicle Details</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              {vehicles.map((vehicle, index) => (
                <div key={index} className="mt-4">
                  <h4 className="text-gray-800 text-lg font-bold">Vehicle {index + 1}</h4>
                  <div className="mt-2">
                    <input 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Number" 
                      value={vehicle.vehicle_number} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_number', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <input 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Color" 
                      value={vehicle.vehicle_color} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_color', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <select 
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
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      value={vehicle.vehicle_make} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_make', e.target.value)}
                    >
                      <option value="" disabled>Vehicle Make</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="EV">EV</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <button 
                  type="button" 
                  onClick={handleAddVehicle}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  Add Another Vehicle
                </button>
              </div>
              <div className="mt-8">
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
