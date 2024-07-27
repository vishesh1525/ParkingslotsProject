import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [upiId, setUpiId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { spotNumber } = useParams(); // Retrieve spot number from URL
    const ratePerHour = 20;
    const user = useSelector(state => state.auth.user?.username);

    useEffect(() => {
        if (!user) {
            setError('User not found');
            return;
        }

        const getReservationDetails = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/Reservation', {
                    params: { username: user, spotnumber: spotNumber },
                    withCredentials: true
                });

                if (response.data.length > 0) {
                    const reservation = response.data[0];
                    const endTime = new Date(reservation.End_time);
                    const startTime = new Date(reservation.createdAt);
                    const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert ms to hours
                    const calculatedAmount = durationInHours * ratePerHour;
                    setAmount(calculatedAmount.toFixed(2)); // Format amount to 2 decimal places
                } else {
                    setError('No reservation details found');
                }
            } catch (error) {
                console.error('Error fetching reservation details:', error.message);
                setError('Error fetching reservation details');
            }
        };

        getReservationDetails();
    }, [user, spotNumber]);

    useEffect(() => {
        const getAllVehicles = async () => {
            try {
                const response = await axios.post('http://localhost:7000/api/v1/vechiles', { username: user }, {
                    withCredentials: true,
                });

                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error.message);
                setError('Error fetching vehicles');
            }
        };

        getAllVehicles();
    }, [user]);

    const handleVehicleChange = (e) => {
        setSelectedVehicle(e.target.value);
    };

    const handleAddVehicle = () => {
        navigate('/vehicleRegistration');
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !selectedVehicle || !spotNumber || !amount || !paymentMethod) {
            setError('Please fill in all required fields');
            return;
        }

        const paymentData = {
            username: user,
            vechile_license: selectedVehicle,
            reservationspot: spotNumber,
            amount: parseFloat(amount), // Convert amount to number
            method: paymentMethod,
            upiId: paymentMethod === 'online-payment' ? upiId : undefined,
        };

        try {
            await axios.post('http://localhost:7000/api/v1/Payment', paymentData);
            toast.success("Payment done");
            navigate('/payment/success');
        } catch (error) {
            console.error('Payment submission error:', error.message);
            toast.error("Payment failure");
            setError('Payment submission failed');
        }
    };

    return (
        <div className="flex flex-col items-center p-4 h-screen bg-gray-800">
            <h1 className="text-3xl font-bold mb-8 text-white">Payment Details</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700 bg-gray-700"
                        value={user || ''}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="spotnumber">
                        Spot Number
                    </label>
                    <input
                        id="spotnumber"
                        type="text"
                        className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700 bg-gray-700"
                        value={spotNumber || ''}
                        readOnly
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        id="amount"
                        type="number"
                        className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700 bg-gray-700"
                        value={amount || ''}
                        readOnly
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="payment_method">
                        Payment Method
                    </label>
                    <select
                        id="payment_method"
                        className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700 bg-gray-700"
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
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="upi_id">
                            UPI ID
                        </label>
                        <input
                            id="upi_id"
                            type="text"
                            className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700 bg-gray-700 bg-gray-700"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="vehicle_select">
                        Select Vehicle
                    </label>
                    <select
                        id="vehicle_select"
                        className="w-full text-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 bg-gray-700 bg-gray-700 bg-gray-700"
                        value={selectedVehicle}
                        onChange={handleVehicleChange}
                        required
                    >
                        <option value="" disabled>Select a vehicle</option>
                        {vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                                <option key={vehicle._id} value={vehicle.license_plate}>
                                    {vehicle.license_plate}
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
                        Pay Now
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Payment;
