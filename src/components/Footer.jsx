import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaRegistered } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white font-normal text-base py-8 px-5 flex flex-col sm:flex-row gap-5 justify-between items-center sm:px-12">
      <div className="font-bold text-lg text-red-600">
        <Link to="/">Logo.</Link>
      </div>

      <p>Copyright 2020 | Logo.</p>

      <ul className="text-center flex flex-col gap-2 sm:flex-row sm:gap-10">
        <li>
          <Link
            to="/about"
            className="flex justify-center gap-2 items-center hover:text-red-500 hover:underline"
          >
            <FaInfoCircle /> About
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="flex justify-center gap-2 items-center hover:text-red-500 hover:underline"
          >
            <FaRegistered /> Sign Up Now
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
