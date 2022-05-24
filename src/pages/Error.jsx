import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="text-white max-w-md md:text-center">
      <h1 className="text-3xl font-extrabold mb-5 text-red-500">404</h1>
      <h2 className="text-xl font-extrabold mb-5 text-gray-400">
        Not Found, What you are looking for?
      </h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae id impedit, odio laboriosam
        praesentium cumque voluptatum molestiae non at sed quis aut rerum animi eos?
      </p>

      <div className="mt-8">
        <Link
          to="/"
          className="w-full py-3 px-5 shadow-md bg-red-500 rounded-md font-semibold text-lg text-white"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
