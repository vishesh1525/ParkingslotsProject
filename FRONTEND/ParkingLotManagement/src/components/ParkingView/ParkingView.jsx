import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ParkingView = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.isAuthenticated);

  if (!user) {
    navigate("/login");
  }

  const handleBookSlot = (spotNumber) => {
    navigate(`/parkingSpots/reservation/${spotNumber}`);
  };

  useEffect(() => {
    const getParkingSpots = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/v1/ParkingSpots", {
          withCredentials: true
        });
        setParkingSlots(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching parking spots:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    getParkingSpots();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800">
      <h1 className="text-3xl font-bold mb-8">Parking Slots</h1>
      <div className="grid gap-4" style={{ gridTemplateRows: 'repeat(8, 50px)', gridTemplateColumns: 'repeat(3, 100px)' }}>
        {parkingSlots.map(slot => (
          <div
            key={slot._id}
            className={`flex items-center justify-center border-2 rounded cursor-pointer ${slot.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => handleBookSlot(slot.Spot_number)}
          >
            <span className="text-white font-bold">{slot.Spot_number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingView;
