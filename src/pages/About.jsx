import React from 'react';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';

const About = () => {
  return (
    <div className="text-white max-w-md md:text-center">
      <h1 className="text-3xl font-extrabold mb-5 text-red-500">About Us</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae id impedit, odio laboriosam
        praesentium cumque voluptatum molestiae non at sed quis aut rerum animi eos?
      </p>

      <div className="mt-8">
        <ul className="flex justify-start md:justify-center items-center text-4xl gap-4">
          <li>
            <a
              className="hover:text-red-500 hover:underline"
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare />
            </a>
          </li>
          <li>
            <a
              className="hover:text-red-500 hover:underline"
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitterSquare />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
