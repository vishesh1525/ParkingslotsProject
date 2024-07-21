// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// const slots = [
//   { id: 1, booked: false, style: { gridArea: '1 / 1 / 2 / 2' } },
//   { id: 2, booked: false, style: { gridArea: '1 / 2 / 2 / 3' } },
//   { id: 3, booked: false, style: { gridArea: '1 / 3 / 2 / 4' } },
//   { id: 4, booked: false, style: { gridArea: '2 / 1 / 3 / 2' } },
//   { id: 5, booked: false, style: { gridArea: '2 / 2 / 3 / 3' } },
//   { id: 6, booked: false, style: { gridArea: '2 / 3 / 3 / 4' } },
//   { id: 7, booked: false, style: { gridArea: '3 / 1 / 4 / 2' } },
//   { id: 8, booked: false, style: { gridArea: '3 / 2 / 4 / 3' } },
//   { id: 9, booked: false, style: { gridArea: '3 / 3 / 4 / 4' } },
//   { id: 10, booked: false, style: { gridArea: '4 / 1 / 5 / 2' } },
//   { id: 11, booked: false, style: { gridArea: '4 / 2 / 5 / 3' } },
//   { id: 12, booked: false, style: { gridArea: '4 / 3 / 5 / 4' } },
//   { id: 13, booked: false, style: { gridArea: '5 / 1 / 6 / 2' } },
//   { id: 14, booked: false, style: { gridArea: '5 / 2 / 6 / 3' } },
//   { id: 15, booked: false, style: { gridArea: '5 / 3 / 6 / 4' } },
//   { id: 16, booked: false, style: { gridArea: '6 / 1 / 7 / 2' } },
//   { id: 17, booked: false, style: { gridArea: '6 / 2 / 7 / 3' } },
//   { id: 18, booked: false, style: { gridArea: '6 / 3 / 7 / 4' } },
//   { id: 19, booked: false, style: { gridArea: '7 / 1 / 8 / 2' } },
//   { id: 20, booked: false, style: { gridArea: '7 / 2 / 8 / 3' } },
// ];

// const ParkingView = () => {
//   const [parkingSlots, setParkingSlots] = useState([{}]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleBookSlot = (id) => {
//     setParkingSlots(
//       parkingSlots.map(slot => slot.id === id ? { ...slot, booked: !slot.booked } : slot)
//     );
//     navigate(`/payment/${id}`); // Navigate to the payment page with slot id
//   };
//   const getparkingspots=async()=>{
//     try {
//       const response=await axios.get("http://localhost:7000/api/v1/ParkingSpots",{
//         withCredentials: true
//       })
//       setParkingSlots(response.data)
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching room:', error.message);
//       setError(error.message);
//       setLoading(false);
//     }
//   }
//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-3xl font-bold mb-8">Parking Slots</h1>
//       <div className="grid gap-4" style={{ gridTemplateRows: 'repeat(8, 50px)', gridTemplateColumns: 'repeat(3, 100px)' }}>
//         {parkingSlots.map(slot => (
//           <div
//             key={slot.id}
//             style={slot.style}
//             className={`flex items-center justify-center border-2 rounded cursor-pointer ${slot.booked ? 'bg-red-500' : 'bg-green-500'}`}
//             onClick={() => handleBookSlot(slot.id)}
//           >
//             <span className="text-white font-bold">Slot {slot.id}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ParkingView;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ParkingView = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBookSlot = (id) => {
    setParkingSlots(
      parkingSlots.map(slot => slot.id === id ? { ...slot, booked: !slot.booked } : slot)
    );
    navigate("/parkingSpots/reservation"); // Navigate to the payment page with slot id
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
    getParkingSpots()

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-8">Parking Slots</h1>
      <div className="grid gap-4" style={{ gridTemplateRows: 'repeat(8, 50px)', gridTemplateColumns: 'repeat(3, 100px)' }}>
        {parkingSlots.map(slot => (
          <div
            key={slot.id}
            style={slot.style}
            className={`flex items-center justify-center border-2 rounded cursor-pointer ${slot.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => handleBookSlot(slot._id)}
          >
            <span className="text-white font-bold">{slot.Spot_number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingView;
