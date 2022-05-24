import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    e.preventDefault();
    const newFormData = {
      [e.target.id]: e.target.value,
    };
    setFormData((prev) => {
      return {
        ...prev,
        ...newFormData,
      };
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || name.length === 0) {
      alert('Please enter a valid name');
      return;
    } else if (email.trim() === '' || email.length === 0) {
      alert('Please enter a valid email');
      return;
    } else if (password.trim() === '' || password.length === 0 || password.length < 8) {
      alert('Please enter a valid password');
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      const currentUser = auth.currentUser;

      const displayName = {
        displayName: name,
      };

      await updateProfile(currentUser, displayName);

      if (user) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm px-3 py-5 text-gray-900 bg-white rounded-md shadow-md sm:px-5">
      <h1 className="mb-4 text-xl font-extrabold">
        <span className="block">Hey,</span>
        <span className="block">Create Account Now.</span>
      </h1>

      <p className="flex items-center justify-start gap-4 mb-4 font-bold text-gray-500">
        Already have an account/{' '}
        <Link to="/signin" className="text-gray-800">
          Login Now
        </Link>
      </p>

      <form className="mb-4" onSubmit={onSubmit}>
        <div className="px-2 py-4 mb-4 bg-gray-100 rounded-md">
          <div className="my-3 mt-0">
            <input
              className="w-full px-2 py-2 text-lg text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-400 outline-none caret-red-500 focus:text-white focus:bg-gray-900 focus:rounded-md focus:placeholder-red-500"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              autoComplete="off"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="my-3">
            <input
              className="w-full px-2 py-2 text-lg text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-400 outline-none caret-red-500 focus:text-white focus:bg-gray-900 focus:rounded-md focus:placeholder-red-500"
              type="email"
              name="email"
              id="email"
              placeholder="name@domain.com"
              autoComplete="off"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="my-3">
            <input
              className="w-full px-2 py-2 text-lg text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-400 outline-none caret-red-500 focus:text-white focus:bg-gray-900 focus:rounded-md focus:placeholder-red-500"
              type="password"
              name="password"
              id="password"
              placeholder="at least 8 characters"
              autoComplete="off"
              value={password}
              onChange={onChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-red-500 rounded-md shadow-md"
        >
          Create Account
        </button>
      </form>

      <p className="flex items-center justify-start gap-4 font-bold text-gray-500">
        2020 Copyright | All rights reserved
        <Link to="/" className="text-gray-800">
          Logo.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
