import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
const ReservationForm = () => {
  const [username, setUsername] = useState('');
  const [selectedSpot,setspots] = useState('');
  

  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading,setloading]=useState(null);
  const usernameFromStore = useSelector((state) => state.auth.user?.username);
  useEffect(() => {
    if (usernameFromStore) {
        setUsername(usernameFromStore);
    }
  }, [usernameFromStore]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null); // Reset success message
    try {
      const reservation = {
        username,
        spotnumber: selectedSpot,
        end_time: endTime
      };
      const response = await axios.post('http://localhost:7000/api/v1/Reservation', reservation, {
        withCredentials: true
      });
      setSuccess("Reservation successfully made!");
      toast.success("Sucesfully created reservation")
      console.log('Reservation successful:', response.data);
    } catch (error) {
     toast.error("Error",error)
      console.error('Error making reservation:', error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-8">Reserve Parking Spot</h1>
      <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
       
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_license">
            Spot Number
          </label>
          <input
            id="spotnumber"
            name="spotnumber"
            type="text"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            value={selectedSpot}
            onChange={(e) => setspots(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_time">
            End Time
          </label>
          <input
            id="end_time"
            name="end_time"
            type="datetime-local"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Reserve Spot
          </button>
        </div>
        {success && <div className="text-green-600 mt-4">{success}</div>}
      </form>
    </div>
  );
};

export default ReservationForm;
