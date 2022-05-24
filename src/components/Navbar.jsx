import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white font-normal text-base p-5 flex justify-between items-center shadow-lg relative sm:px-12">
      <div className="font-bold text-lg text-red-600">
        <Link to="/">Logo.</Link>
      </div>
      <ul className="flex justify-between items-center gap-4 sm:gap-8">
        <li>
          <Link to="/" className="hover:text-red-500 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-red-500 hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-red-500 hover:underline">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
