import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehicleForm = () => {
  const [username, setUsername] = useState('');
  const [vehicleCount, setVehicleCount] = useState(1);
  const [vehicles, setVehicles] = useState([{ license_plate: '', vehicle_type: '', make: '', model: '', color: '' }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const authStatus = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStatus) {
      navigate('/login');
    }
  }, [authStatus, navigate]);

  const usernameFromStore = useSelector((state) => state.auth.user?.username);
  useEffect(() => {
    if (usernameFromStore) {
      setUsername(usernameFromStore);
    }
  }, [usernameFromStore]);

  const handleVehicleCountChange = (e) => {
    const count = parseInt(e.target.value);
    const updatedVehicles = vehicles.slice(0, count);
    for (let i = vehicles.length; i < count; i++) {
      updatedVehicles.push({ license_plate: '', vehicle_type: '', make: '', model: '', color: '' });
    }
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
    setLoading(true);
    try {
      const vehicleData = vehicles.map(vehicle => ({ ...vehicle, username }));
      const response = await axios.post('http://localhost:7000/api/v1/vechile', vehicleData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Vehicle form submitted:', response.data);
      toast.success('Vehicle details submitted successfully!', {
        onClose: () => {
          setTimeout(() => {
            navigate('/dashboard');
          }, 900);
        }
      });
    } catch (error) {
      setError(error.message);
      console.error('Error submitting vehicle form:', error.response?.data?.message || error.message);
      toast.error('Error submitting vehicle form: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 py-4">
      <div className="max-w-md w-full bg-transparent backdrop-blur-lg p-8 rounded-2xl shadow-lg overflow-auto">
        <h2 className="text-white text-center text-2xl font-bold">Vehicle Details</h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
              value={username}
              readOnly
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="vehicle_count">
              Vehicle Count
            </label>
            <select
              name="vehicle_count"
              className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
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
              <h4 className="text-white text-lg font-bold">Vehicle {index + 1}</h4>
              <div className="mt-2">
                <input
                  name={`license_plate_${index}`}
                  type="text"
                  required
                  className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
                  placeholder="Vehicle Number (ex) - KA 05 1992"
                  value={vehicle.license_plate}
                  onChange={(e) => handleVehicleChange(index, 'license_plate', e.target.value)}
                />
              </div>
              <div className="mt-2">
                <input
                  name={`color_${index}`}
                  type="text"
                  required
                  className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
                  placeholder="Vehicle Color"
                  value={vehicle.color}
                  onChange={(e) => handleVehicleChange(index, 'color', e.target.value)}
                />
              </div>
              <div className="mt-2">
                <select
                  name={`vehicle_type_${index}`}
                  required
                  className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
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
                  className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
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
                  className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700"
                  placeholder="Vehicle Model"
                  value={vehicle.model}
                  onChange={(e) => handleVehicleChange(index, 'model', e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Vehicle Details'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VehicleForm;
