import React, { useState } from 'react';
import axios from 'axios'; // Use axios for API calls

const AddSlot = ({ isAdmin }) => { // Add isAdmin prop to check admin status
    const [userName, setUserName] = useState('');
    const [spotNumber, setSpotNumber] = useState('');
    const [floor, setFloor] = useState('');
    const [status, setStatus] = useState('Available');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare slot data
            const slotData = {
                userName,
                spotNumber,
                floor,
                status
            };

            // Make API request to add slot
            const response = await axios.post('/api/parking-spots', slotData);

            // Handle successful response
            setMessage(`Slot added successfully: ${JSON.stringify(response.data)}`);
        } catch (error) {
            // Handle errors
            setMessage(`Error adding slot: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 h-screen mt-20">
            {isAdmin && <h2 className="text-2xl font-bold mb-4">Admin Access Required: Add New Parking Spot</h2>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {isAdmin && (
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="userName">User Name</label>
                        <input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md"
                            required
                        />
                    </div>
                )}
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
        </div>
    );
};

export default AddSlot;
