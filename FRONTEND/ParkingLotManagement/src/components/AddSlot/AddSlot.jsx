import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Use axios for API calls
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddSlot = () => {
  const [userName, setUserName] = useState('');
  const [spotNumber, setSpotNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [status, setStatus] = useState('Available');
  const [message, setMessage] = useState('');

  const usernameFromStore = useSelector((state) => state.auth.user?.username);

  // Use useEffect to set the username once
  useEffect(() => {
    if (usernameFromStore) {
      setUserName(usernameFromStore);
    }
  }, [usernameFromStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const slotData = {
        username:userName,
        spot_number:spotNumber,
        floor,
        status,
      };

      
      const response = await axios.post('http://localhost:7000/api/v1/ParkingSpots', slotData);
      toast.success("Parking spot created sucesfully")
      // Handle successful response
      setMessage(`Slot added successfully: ${JSON.stringify(response.data.spotNumber)}`);
    } catch (error) {
      // Handle errors
      toast.error('Error submitting vehicle form: ' + (error.response?.data?.message || error.message));
      setMessage(`Error adding slot: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 h-screen mt-20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="userName">User Name</label>
          <input
            id="userName"
            type="text"
            readOnly
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="spotNumber">Spot Number</label>
          <input
            id="spotNumber"
            type="text"
            value={spotNumber}
            onChange={(e) => setSpotNumber(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="floor">Floor</label>
          <input
            id="floor"
            type="text"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Add Parking Spot
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddSlot;
