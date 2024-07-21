import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const auth = useSelector((state) => state.auth.user?.role);

  return (
    <header>
      <div className="navbar bg-base-300">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/vehicleRegistration">Register Vehicle</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/parkingSpots">Parking Spots</Link></li>
              {auth === 'Admin' && <li><Link to="/AddSlot">Add Slot</Link></li>}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/vehicleRegistration">Register Vehicle</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/parkingSpots">Parking Spots</Link></li>
            {auth === 'Admin' && <li><Link to="/AddSlot">Add Slot</Link></li>}
          </ul>
        </div>
        <div className="navbar-end">
          {!authStatus ? (
            <Link to="/login" className="btn">Login</Link>
          ) : (
            <Link to="/logout" className='btn-ghost'>Logout</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
