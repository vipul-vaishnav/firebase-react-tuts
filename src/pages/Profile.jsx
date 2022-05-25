import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import UserIcon from '../assets/images/download.png';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase.config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [bio, setBio] = useState('Add your bio here...');
  const [editBio, setEditBio] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserProfile(user);
        const getBio = async () => {
          const docRef = doc(db, 'users', user.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBio(docSnap.data().bio);
          }
        };
        getBio();
      } else {
        navigate('/signin');
      }
    });
  }, [navigate]);

  const logout = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  const onChange = (e) => {
    e.preventDefault();

    setBio(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();

    setEditBio(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      const docRef = doc(db, 'users', user.email);

      await updateDoc(docRef, { bio });

      setEditBio(true);
    } catch (error) {
      alert('Bio not updated');
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-sm">
      <div className="flex items-center justify-start gap-4 px-4 py-4 my-6 text-gray-900 bg-gray-100 rounded-md sm:p-6">
        <div className="overflow-hidden bg-gray-300 rounded-full w-14 h-14">
          <img src={UserIcon} alt="user-icon" className="w-full h-full" />
        </div>
        <div>
          <h2 className="mb-1 text-xl font-extrabold">{userProfile?.displayName}</h2>
          <h3 className="mt-1 text-base font-bold">{userProfile?.email}</h3>
        </div>
      </div>

      <div className="relative px-4 py-4 my-6 text-gray-900 bg-gray-100 rounded-md sm:p-6">
        <h2 className="mb-1 text-xl font-extrabold">Bio:- </h2>
        <form onSubmit={onSubmit}>
          <textarea
            name="bio"
            id="bio"
            cols="40"
            rows="6"
            value={bio}
            className={`${!editBio && 'border-b border-gray-900 bg-gray-200'} 
              w-full h-max text-gray-900 bg-gray-100 outline-0`}
            placeholder="lorem ipsum dolor sit amet..."
            disabled={editBio}
            onChange={onChange}
          />
          {editBio === true ? (
            <button
              className="absolute text-lg text-red-500 top-7 right-4 sm:right-6"
              type="button"
              onClick={onClick}
            >
              <FaEdit />
            </button>
          ) : (
            <button
              className="absolute text-lg text-red-500 top-7 right-4 sm:right-6"
              type="submit"
            >
              <FaSave />
            </button>
          )}
        </form>
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
          onClick={logout}
          className="px-8 py-2 text-lg font-bold text-gray-900 bg-red-500 border-0 rounded-md shadow-lg outline-0 hover:text-red-500 hover:bg-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
