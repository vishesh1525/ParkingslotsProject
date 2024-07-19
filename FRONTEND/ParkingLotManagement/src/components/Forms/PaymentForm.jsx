import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you might use axios for API calls

const PaymentForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [upiId, setUpiId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vehicles from the API or local state
    setVehicles([
      { _id: '1', vehicle_number: 'KA 01 AB 1234', vehicle_color: 'Red', vehicle_type: 'car' },
      { _id: '2', vehicle_number: 'KA 02 CD 5678', vehicle_color: 'Blue', vehicle_type: 'bike' }
    ]);
  }, []);

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };

  const handleAddVehicle = () => {
    navigate('/vehicleAdd');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the selected slot ID from localStorage
    const selectedSlotId = localStorage.getItem('selectedSlotId');
    if (!selectedSlotId) return;

    // Handle payment form submission
    const paymentData = {
      reservation_id: selectedVehicle,
      user_id: 'dummyUserId',
      amount: amount,
      paymentDate: new Date(),
      paymentMethod: paymentMethod,
      upiId: paymentMethod === 'online-payment' ? upiId : undefined,
      username: username
    };
    localStorage.setItem('bookedSlotId', selectedSlotId);
    navigate('/ParkingView');
    // try {
    //   // Post payment data to the server (or simulate API call)
    //   const response = await axios.post('/api/payments', paymentData);

    //   // Check the response and handle slot status update
    //   if (response.status === 200) {
    //     // Save booked slot ID to localStorage
    //     localStorage.setItem('bookedSlotId', selectedSlotId);
    //     navigate('/ParkingView');
    //   }
    // } catch (error) {
    //   console.error('Payment submission error:', error);
    // }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Payment Details</h2>
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
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment_method">Payment Method</label>
              <select
                id="payment_method"
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                required
              >
                <option value="cash">Cash</option>
                <option value="online-payment">Online Payment</option>
              </select>
            </div>
            {paymentMethod === 'online-payment' && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upi_id">UPI ID</label>
                <input
                  id="upi_id"
                  type="text"
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_select">Select Vehicle</label>
              <select
                id="vehicle_select"
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                value={selectedVehicle}
                onChange={handleVehicleChange}
              >
                <option value="" disabled>Select a vehicle</option>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.vehicle_number} - {vehicle.vehicle_color} ({vehicle.vehicle_type})
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No vehicles available</option>
                )}
              </select>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAddVehicle}
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                >
                  Add Vehicle Details
                </button>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
