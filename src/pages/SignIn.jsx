import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      if (user) {
        navigate('/');
      }
    } catch (error) {
      alert('User not found');
      console.log(error.message);
    }
  };

  const onClick = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent successfully');
    } catch (error) {
      alert('Something went wrong!');
      console.log(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm px-3 py-5 text-gray-900 bg-white rounded-md shadow-md sm:px-5">
      <h1 className="mb-4 text-xl font-extrabold">
        <span className="block">Hey,</span>
        <span className="block">Login Now.</span>
      </h1>

      <p className="flex items-center justify-start gap-4 mb-4 font-bold text-gray-500">
        If you are new/{' '}
        <Link to="/signup" className="text-gray-800">
          Create New
        </Link>
      </p>

      <form className="mb-4" onSubmit={onSubmit}>
        <div className="px-2 py-4 mb-4 bg-gray-100 rounded-md">
          <div className="my-3 mt-0">
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
          Login
        </button>
      </form>

      <p className="flex items-center justify-start gap-4 font-bold text-gray-500">
        Forgot Passcode?/{' '}
        <button onClick={onClick} className="font-bold text-gray-800 border-0 outline-none">
          Reset
        </button>
      </p>
    </div>
  );
};

export default SignIn;
