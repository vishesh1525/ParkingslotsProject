import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import paymentsucess from "../../assets/paymetSuccess.gif";
import { TiTick } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import sound from "../../assets/sound.mp4";

const Success = () => {
    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [error, setError] = useState(null);
    const [cost, setCost] = useState('');
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth.user.username);

    useEffect(() => {
        // Play sound when component mounts
        const audio = new Audio(sound);
        audio.play();
    }, []);

    useEffect(() => {
        const getPaymentInfo = async () => {
            try {
                const response = await axios.post("http://localhost:7000/api/v1/Payements", {
                    username
                }, {
                    withCredentials: true
                });
                setPaymentInfo(response.data);
                setCost(response.data.amount);
            } catch (error) {
                console.error("Error fetching payment info:", error);
                setError(error.message);
            }
        };

        getPaymentInfo();
    }, [username]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen text-2xl text-gray-800 bg-gray-800'>
                <div className='w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
            </div>
        );
    }

    if (error) {
        return (
            <p className='flex justify-center h-screen items-center text-2xl text-red-700'>
                {error}
            </p>
        );
    }

    return (
        <section className="flex flex-col items-center p-4 h-screen items-center justify-center">
            {/* Audio Element */}
            <audio src={sound} autoPlay className="hidden"></audio>

            <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-6'>
                <div className='flex flex-col items-center text-center'>
                    <img
                        className='w-16 h-16 mb-4'
                        src={paymentsucess}
                        alt="Success GIF"
                    />
                    <TiTick className='text-green-500 text-4xl mb-2' />
                    <h1 className='text-2xl font-bold text-gray-800 mb-4'>Booking Confirmed!</h1>
                    <p className='text-gray-600 mb-4'>
                        Thank you for choosing Book My Spot! Your reservation is confirmed. If there's anything you need before your arrival, please don't hesitate to reach out to your host.
                    </p>
                    <div className='bg-gray-100 p-4 rounded-lg mb-6'>
                        <div className='flex flex-row items-center justify-between mb-2'>
                            <p className='text-gray-600'>Amount Paid:</p>
                            <div className='flex items-center gap-1'>
                                <FaRupeeSign className='text-2xl' />
                                <span className='text-xl font-bold'>{cost}</span>
                            </div>
                        </div>
                        <p className='text-gray-500 text-xs'>Payment Success!</p>
                    </div>
                    <div className='text-gray-800'>
                        <Link to="/dashboard" className='text-blue-500 underline text-sm'>
                            Go back to home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Success;
