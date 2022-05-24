import React, { useEffect, useState } from 'react';
import UserIcon from '../assets/images/download.png';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUserProfile(user);
      } else {
        navigate('/signin');
      }
    });
  }, [navigate]);

  const onClick = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  return (
    <div className="relative max-w-sm">
      <div className="flex items-center justify-start gap-4 px-4 py-4 my-6 text-gray-900 bg-gray-100 rounded-md sm:p-6">
        <div className="overflow-hidden bg-gray-300 rounded-full w-14 h-14">
          <img src={UserIcon} alt="user-icon" className="w-full h-full" />
        </div>
        <div>
          <h2 className="mb-1 text-xl font-extrabold">{userProfile?.displayName}</h2>
          <h3 className="mt-1 text-base font-bold">{userProfile?.email}</h3>
        </div>
      </div>

      <div className="px-4 py-4 my-6 text-gray-900 bg-gray-100 rounded-md sm:p-6">
        <h2 className="mb-1 text-xl font-extrabold">Bio:- </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, asperiores quas. Mollitia
          perspiciatis minus neque aut! Reiciendis, harum? Eligendi corrupti dolorem, beatae totam
          nisi laboriosam.
        </p>
      </div>

      <div className="px-4 py-4 my-6 text-gray-900 bg-gray-100 rounded-md sm:p-6">
        <h2 className="mb-1 text-xl font-extrabold">Website:- </h2>
        <p>
          <a
            href="www.john-doe.co.in"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            www.john-doe.co.in
          </a>
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={onClick}
          className="px-8 py-2 text-lg font-bold text-gray-900 bg-red-500 border-0 rounded-md shadow-lg outline-0 hover:text-red-500 hover:bg-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
