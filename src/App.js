import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <div className="w-full text-base text-white font-normal min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="text-white py-5 px-5 flex-1 flex justify-center items-center sm:px-12 bg-gray-700">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
