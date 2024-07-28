import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logout } from "../../index";
import logo from "../../assets/hlogo.png";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const auth = useSelector((state) => state.auth.user?.role);

  return (
    <header>
      <div className="navbar bg-base-300 gap-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
            >
              <li><Link to="/" className="text-lg font-semibold">Dashboard</Link></li>
              <li><Link to="/vehicleRegistration" className="text-lg font-semibold">Register Vehicle</Link></li>
              <li><Link to="/about" className="text-lg font-semibold">About</Link></li>
              <li><Link to="/contact" className="text-lg font-semibold">Contact</Link></li>
              <li><Link to="/parkingSpots" className="text-lg font-semibold">Parking Spots</Link></li>
              {auth === 'Admin' && (
                <>
                  <li><Link to="/AddSlot" className="text-lg font-semibold">Add Slot</Link></li>
                  <li><Link to="/Adminlogin" className="text-lg font-semibold">Admin Section</Link></li>
                </>
              )}
            </ul>
          </div>
          <button className='hover:scale-90 hover:bg-base-300'>
            <img src={logo} className='w-16' alt="Logo" />
          </button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/" className="text-lg font-semibold">Dashboard</Link></li>
            <li><Link to="/vehicleRegistration" className="text-lg font-semibold">Register Vehicle</Link></li>
            <li><Link to="/about" className="text-lg font-semibold">About</Link></li>
            <li><Link to="/contact" className="text-lg font-semibold">Contact</Link></li>
            <li><Link to="/parkingSpots" className="text-lg font-semibold">Parking Spots</Link></li>
            {auth === 'Admin' && (
              <>
                <li><Link to="/AddSlot" className="text-lg font-semibold">Add Slot</Link></li>
                <li><Link to="/Adminlogin" className="text-lg font-semibold">Admin Section</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end flex items-center space-x-2">
          {!authStatus ? (
            <Link to="/login" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Login
            </Link>
          ) : (
            <Logout />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
