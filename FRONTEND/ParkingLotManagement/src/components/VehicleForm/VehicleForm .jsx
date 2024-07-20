import React, { useState } from 'react';
import logo from '../../assets/logo.svg';

const VehicleForm = () => {
  const [vehicleCount, setVehicleCount] = useState(1);
  const [vehicles, setVehicles] = useState([{ vehicle_number: '', vehicle_color: '', vehicle_type: '', vehicle_make: '' }]);

  const handleVehicleCountChange = (e) => {
    const count = parseInt(e.target.value);
    const updatedVehicles = Array(count).fill({ vehicle_number: '', vehicle_color: '', vehicle_type: '', vehicle_make: '' });
    setVehicleCount(count);
    setVehicles(updatedVehicles);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Vehicle form submitted:', vehicles);
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
                      name={`username`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Enter the user name" 
                      value={vehicle.vehicle_number} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_number', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <input 
                      name={`vehicle_number_${index}`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Number - KA 05 1992" 
                      value={vehicle.vehicle_number} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_number', e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <input 
                      name={`vehicle_color_${index}`} 
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
                      name={`vehicle_type_${index}`} 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      value={vehicle.vehicle_type} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_type', e.target.value)}
                    >
                      <option value="" disabled>Vehicle Type</option>
                      <option value="car">car</option>
                      <option value="bike">bike</option>
                    </select>
                  </div>
                  <div className="mt-2">
                  <select 
                      name={`vehicle_type_${index}`} 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      value={vehicle.vehicle_type} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_type', e.target.value)}
                    >
                      <option value="" disabled>Vehicle Make</option>
                      <option value="petrol">petrol</option>
                      <option value="diesel">diesel</option>
                      <option value="EV">EV</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <input 
                      name={`vehicle_color_${index}`} 
                      type="text" 
                      required 
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" 
                      placeholder="Vehicle Model" 
                      value={vehicle.vehicle_color} 
                      onChange={(e) => handleVehicleChange(index, 'vehicle_color', e.target.value)}
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
