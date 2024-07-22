import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import paymentsucess from "../../assets/paymetSuccess.gif"
import { TiTick } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux"
const Success = () => {
    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [error, setError] = useState(null)
    const [cost, setCost] = useState('');
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth.user.username)
    useEffect(() => {
        const getPaymentInfo = async () => {
            try {
                const response = await axios.post("http://localhost:7000/api/v1/Payements", {
                    username
                }, {
                    withCredentials: true
                });
                // console.log("the payment info is : ",response.data.data.payment.cost)
                // console.log("the cost info is : ",response.data.data.cost)
                setPaymentInfo(response.data);
                setCost(response.data.amount)
            } catch (error) {
                console.error("Error fetching payment info:", error);
                setError(error.message)
            }
        };

        getPaymentInfo();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (<div className='flex justify-center items-center h-screen text-5xl text-center text-gray-800'>Loading.....</div>);
    }
    if (error) {
        return (<p className='flex justify-center h-screen items-center text-5xl text-center text-red-700'>{error}</p>);
    }

    return (
        <section className='h-screen lg:ml-16 ml-1 mt-20 bg-slate-100 overflow-x-hidden mb-20'>
            <div id='mainDiv' className='flex lg:flex-row flex-col-reverse lg:gap-0 gap-10 '>
                <div id="left" className='flex flex-col lg:w-1/2 w-screen ml-4'>
                    <div className="heading ml-4">
                        <h1 className='text-3xl text-black font-bold font-rubik'>Booking confirmed </h1>
                        <h1 className='text-3xl text-black font-bold mt-1 font-rubik'>Successfully!</h1>
                    </div>
                    <div className="para lg:w-2/3 w-4/5 mt-4 text-gray-700">
                        <p>Thank you for choosing The Sapphire's Retreat! Your reservation is confirmed. If there's anything you need before your arrival, please don't hesitate to reach out to your host.</p>
                    </div>
                    <div className='navigate'>
                        <Link to={"/dashboard"} className='text-[15px] underline font-rubik mt-5 text-black text-center'>Go back to home</Link>
                    </div>
                </div>
                <div id="rights" className='lg:w-1/2 lg:mr-10 flex gap-5 flex-col'>
                    <div id="amount">
                        <div className='bg-white p-5 h-32 lg:w-[500px] w-screen flex items-center justify-between rounded-lg'>
                            <div id='amountInfo' className=''>
                                <div className='flex flex-row items-center justify-center gap-2'>
                                    <h1 className='text-3xl font-bold text-black font-rubik'>{cost}</h1>
                                </div>
                                <p className='text-gray-500 text-xs'>Payment Success...!</p>
                            </div>
                        </div>
                    </div>
                    <div id="paymentDetails" className='bg-white p-5 h-auto lg:w-[500px] w-screen rounded-lg'>
                        <h1 className='text-[18px] text-black font-rubik font-semibold'>Payment details</h1>
                        <div id="paymentInfo" className='mt-5 flex flex-col gap-6 text-xs'>
                            <div id="date" className='flex flex-row justify-between'>
                                <p className='text-gray-500 text-xs'>Date</p>
                                <p className='text-black font-bold'>{paymentInfo.createdAt}</p>
                            </div>
                            <div id="allocatedRoom" className='flex flex-row justify-between'>
                                <p className='text-gray-500 text-xs'>Allocated Room</p>
                                <p className='text-black font-bold'>{paymentInfo.reservation_id}</p>
                            </div>
                            <div id="refNo" className='flex flex-row justify-between'>
                                <p className='text-gray-500 text-xs'>Reference Number</p>
                                <p className='text-black font-bold'>{paymentInfo._id}</p>
                            </div>
                            <div id="amount">
                        <div className='bg-white p-5 h-32 lg:w-[500px] w-screen flex items-center justify-between rounded-lg'>
                            <div id='amountInfo' className=''>
                                <div className='flex flex-row items-center justify-center gap-2'>
                                    <p className='text-3xl font-bold text-black font-rubik'><FaRupeeSign /></p>
                                    <h1 className='text-3xl font-bold text-black font-rubik'>{cost}</h1>
                                </div>
                                <p className='text-gray-500 text-xs'>Payment Success...!</p>
                            </div>
                            <div id='successGif'>
                                <img
                                    className='w-28'
                                    src={paymentsucess}
                                    alt="Success GIF" />
                            </div>
                        </div>
                    </div>
                            <div id="paymentMethod" className='flex flex-row justify-between'>
                                <p className='text-gray-500 text-xs'>Payment Method</p>
                                <p className='text-black text-xs font-bold'>{paymentInfo.paymentMethod}</p>
                            </div>
                            <div id="Vechile" className='flex flex-row justify-between'>
                                <p className='text-gray-500 text-xs'>Vechile License</p>
                                <p className='text-black text-xs font-bold'>{paymentInfo.vechile_license}</p>
                            </div>
                            <div id="paymentStatus" className='flex flex-row justify-between'>
                                <p className='text-gray-500 text-xs'>Payment Status</p>
                                <div className='flex flex-row items-center justify-center gap-2 text-black font-bold'>
                                    <p>Success</p>
                                    <span><TiTick /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Success;
