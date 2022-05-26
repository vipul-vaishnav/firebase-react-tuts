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
import NewPost from './pages/NewPost';
import YourPosts from './pages/YourPosts';

const App = () => {
  return (
    <>
      <div className="flex flex-col justify-between w-full min-h-screen text-base font-normal text-white">
        <Navbar />
        <div className="flex items-center justify-center flex-1 px-5 py-5 text-white bg-gray-700 sm:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/posts" element={<YourPosts />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
