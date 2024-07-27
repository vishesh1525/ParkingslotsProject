import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { login } from "../../store/authSlice";
import logo from '../../assets/log3.svg';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(true); // Add state for the checkbox
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:7000/api/v1/login", {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Login successful", response.data.user);
      dispatch(login(response.data.user));
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data || "Network error, please try again later.";
      setError(errorMsg);
      console.error("Error signing in:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = () => {
    setRememberMe(prevState => !prevState);
  };

  return ( 
    <div className="bg-gray-800 min-h-screen ">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 ">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full bg-white text-sm border text-black border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter your email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input 
                    name="password" 
                    type="password" 
                    required 
                    className="w-full bg-white text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 text-black"
                    placeholder="Enter your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 7.178 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox" 
                    className="custom-checkbox h-4 w-4 focus:ring-blue-500 rounded" 
                    style={{ border: '1px solid black', backgroundColor: 'transparent', boxShadow: 'none' }} 
                    checked={rememberMe} // Bind state to checkbox
                    onChange={handleCheckboxChange} // Handle checkbox change
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-black">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="javascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="!mt-8">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-black bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-black text-sm !mt-8 text-center">
                Don't have an account? {" "} 
                <Link to="/signup" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Register here
                </Link>
              </p>
              {loading && <p className="text-black text-center mt-4">Loading...</p>}
              {error && <p className="text-red-600 text-center mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
