import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialSlots = [
  { id: 1, booked: false, style: { gridArea: '1 / 1 / 2 / 2' } },
  { id: 2, booked: false, style: { gridArea: '1 / 2 / 2 / 3' } },
  { id: 3, booked: false, style: { gridArea: '1 / 3 / 2 / 4' } },
  { id: 4, booked: false, style: { gridArea: '2 / 1 / 3 / 2' } },
  { id: 5, booked: false, style: { gridArea: '2 / 2 / 3 / 3' } },
  { id: 6, booked: false, style: { gridArea: '2 / 3 / 3 / 4' } },
  { id: 7, booked: false, style: { gridArea: '3 / 1 / 4 / 2' } },
  { id: 8, booked: false, style: { gridArea: '3 / 2 / 4 / 3' } },
  { id: 9, booked: false, style: { gridArea: '3 / 3 / 4 / 4' } },
  { id: 10, booked: false, style: { gridArea: '4 / 1 / 5 / 2' } },
  { id: 11, booked: false, style: { gridArea: '4 / 2 / 5 / 3' } },
  { id: 12, booked: false, style: { gridArea: '4 / 3 / 5 / 4' } },
  { id: 13, booked: false, style: { gridArea: '5 / 1 / 6 / 2' } },
  { id: 14, booked: false, style: { gridArea: '5 / 2 / 6 / 3' } },
  { id: 15, booked: false, style: { gridArea: '5 / 3 / 6 / 4' } },
  { id: 16, booked: false, style: { gridArea: '6 / 1 / 7 / 2' } },
  { id: 17, booked: false, style: { gridArea: '6 / 2 / 7 / 3' } },
  { id: 18, booked: false, style: { gridArea: '6 / 3 / 7 / 4' } },
  { id: 19, booked: false, style: { gridArea: '7 / 1 / 8 / 2' } },
  { id: 20, booked: false, style: { gridArea: '7 / 2 / 8 / 3' } },
];

const ParkingView = () => {
  const [parkingSlots, setParkingSlots] = useState(initialSlots);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a slot booking was completed and update the status
    const slotToUpdate = localStorage.getItem('bookedSlotId');
    if (slotToUpdate) {
      setParkingSlots(parkingSlots.map(slot => 
        slot.id === parseInt(slotToUpdate) ? { ...slot, booked: true } : slot
      ));
      localStorage.removeItem('bookedSlotId');
    }
  }, [parkingSlots]);

  const handleSelectSlot = (id) => {
    if (selectedSlot === null || selectedSlot === id) {
      setSelectedSlot(id);
    }
  };

  const handleBookSlot = () => {
    if (selectedSlot !== null) {
      // Save the selected slot to localStorage to be used on the payment page
      localStorage.setItem('selectedSlotId', selectedSlot);
      navigate(`/payment/${selectedSlot}`);
    }
  };

  const handleUnreserveSlot = () => {
    if (selectedSlot !== null) {
      // Logic to unreserve the slot
      setParkingSlots(parkingSlots.map(slot => 
        slot.id === selectedSlot ? { ...slot, booked: false } : slot
      ));
      setSelectedSlot(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-8">Parking Slots</h1>
      <div className="grid gap-4" style={{ gridTemplateRows: 'repeat(8, 50px)', gridTemplateColumns: 'repeat(3, 100px)' }}>
        {parkingSlots.map(slot => (
          <div
            key={slot.id}
            style={slot.style}
            className={`flex items-center justify-center border-2 rounded cursor-pointer ${
              slot.booked ? 'bg-yellow-500 border-yellow-800 shadow-lg' : 'bg-green-700 border-green-900 shadow-md'
            } ${selectedSlot === slot.id ? 'ring-4 ring-blue-300' : ''}`}
            onClick={() => handleSelectSlot(slot.id)}
            // Disable clicks on other slots if a slot is already selected
            onMouseDown={(e) => {
              if (selectedSlot !== null && selectedSlot !== slot.id) {
                e.preventDefault();
              }
            }}
          >
            <span className="text-white font-bold">Slot {slot.id}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleBookSlot}
          disabled={selectedSlot === null || parkingSlots.find(slot => slot.id === selectedSlot)?.booked}
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Proceed to Payment
        </button>
        <button
          onClick={handleUnreserveSlot}
          disabled={selectedSlot === null}
          className="ml-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Unreserve/Park Completed Slot
        </button>
      </div>
    </div>
  );
};

export default ParkingView;
