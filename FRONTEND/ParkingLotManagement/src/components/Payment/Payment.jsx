import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const [vehicles, setVehicles] = useState([]);
    const [spotnumber, setSpotnumber] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [upiId, setUpiId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const ratePerHour = 20;
    const user = useSelector(state => state.auth.user?.username);

    useEffect(() => {
        const getReservations = async () => {
            if (!user) return; // Exit if user is not defined

            try {
                const response = await axios.get('http://localhost:7000/api/v1/Reservation', {
                    params: { username: user },
                    withCredentials: true
                });

                if (response.data.length > 0) {
                    const reservation = response.data[0];
                    const spot = reservation.Spot_number[0];
                    const endTime = new Date(reservation.End_time);
                    const startTime = new Date(reservation.createdAt);
                    console.log(endTime-startTime)
                    const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert ms to hours
                    const calculatedAmount = durationInHours * ratePerHour;
                    console.log(durationInHours)
                    setAmount(calculatedAmount.toFixed(2)); // Format amount to 2 decimal places
                    
                } else {
                    setError('No reservations found');
                }
            } catch (error) {
                console.error('Error fetching reservations:', error.message);
                setError('Error fetching reservations');
            }
        };

        getReservations();
    }, []);

    useEffect(() => {
        const getAllVehicles = async () => {
            try {
                const response = await axios.post('http://localhost:7000/api/v1/vechiles', {username:user},{
                    withCredentials: true,
                });

                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error.message);
                setError('Error fetching vehicles');
            }
        };

        getAllVehicles();
    }, []);

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

        if (!user || !selectedVehicle || !spotnumber || !amount || !paymentMethod) {
            setError('Please fill in all required fields');
            return;
        }

        const paymentData = {
            username: user,
            vechile_license: selectedVehicle,//changed the name as in models earlier there was a spelling mistake 
            reservationspot: spotnumber,
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
        <div className="bg-gray-600 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <h2 className="text-white text-center text-2xl font-bold">Payment Details</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="w-full text-gray-700 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                value={user || ''}
                                
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="spotnumber">Spot Number</label>
                            <input
                                id="spotnumber"
                                type="text"
                                className="w-full text-gray-700 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                value={spotnumber}
                                onChange={(e) => setSpotnumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="amount">Amount</label>
                            <input
                                id="amount"
                                type="number"
                                className="w-full text-gray-700 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                value={amount}
                                onChange={(e)=>setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="payment_method">Payment Method</label>
                            <select
                                id="payment_method"
                                className="w-full text-gray-700 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
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
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="upi_id">UPI ID</label>
                                <input
                                    id="upi_id"
                                    type="text"
                                    className="w-full text-gray-700 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="vehicle_select">Select Vehicle</label>
                            <select
                                id="vehicle_select"
                                className="w-full text-gray-700 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
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
                            {/* <button
                                type="submit"
                                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Submit Payment
                            </button> */}
                            <button type="submit" class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
<svg aria-hidden="true" class="w-10 h-3 me-2 -ms-1" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z" fill="white"/></svg>
Pay Now</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Payment;
