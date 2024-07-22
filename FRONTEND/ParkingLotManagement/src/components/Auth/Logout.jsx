import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/v1/logout", {
                withCredentials: true, // Ensure credentials (cookies) are sent with the request
            });
            console.log("User logged out:", response.data);
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <div className="navbar-end mt-7">
            {/* <button className="btn-warning text-white" onClick={logoutHandler}>
                Logout
            </button> */}
            <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default Logout;