import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';

const CustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phoneno, setPhoneno] = useState(['', '']); // Initialize as array
  const [adminPass, setAdminPass] = useState(''); // Admin password state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ph_no_1') {
      setPhoneno([value, phoneno[1]]);
    } else if (name === 'ph_no_2') {
      setPhoneno([phoneno[0], value]);
    } else if (name === 'admin_pass') {
      setAdminPass(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for admin password if role is Admin
    if (role === 'Admin' && adminPass !== 'book123') {
      setError('Invalid admin password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/api/v1/signup", {
        username,
        firstname,
        lastname,
        email,
        role,
        phonenos: phoneno,
        password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);
      dispatch(login(response.data.user));
      navigate("/login");
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <a href="javascript:void(0)">
            {/* <img src={logo} alt="logo" className='w-45 mb-8 mx-auto block rounded-lg' /> */}
          </a>
          <div className="p-8 rounded-2xl bg-white shadow-lg">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    name="firstname"
                    type="text"
                    required
                    className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <input
                    name="lastname"
                    type="text"
                    required
                    className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    name="ph_no_1"
                    type="text"
                    required
                    className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Phone Number 1"
                    value={phoneno[0]}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <input
                    name="ph_no_2"
                    type="text"
                    className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Phone Number 2"
                    value={phoneno[1]}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <select
                  name="role"
                  className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              {role === 'Admin' && (
                <div>
                  <input
                    name="admin_pass"
                    type="password"
                    className="w-full text-gray-900 bg-gray-100 text-sm border border-gray-300 px-4 py-3 rounded-md placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Admin Password"
                    value={adminPass}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <p className="text-gray-800 text-sm !mt-8 text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Sign in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
