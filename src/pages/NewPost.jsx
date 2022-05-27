import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase.config';
import {
  collection,
  arrayUnion,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const NewPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const { title, content } = formData;

  const onChange = (e) => {
    e.preventDefault();
    const newData = {
      [e.target.id]: e.target.value,
    };
    setFormData((prev) => {
      return {
        ...prev,
        ...newData,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Creating a new post
    const postData = {
      ...formData,
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      likes: 0,
      dislikes: 0,
      posted_at: serverTimestamp(),
      user_ref: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, 'posts'), postData);

    // Creating a new post for the logged in user
    const userRef = doc(db, 'users', auth.currentUser.email);
    await updateDoc(userRef, {
      posts: arrayUnion(docRef.id),
    });

    setFormData({
      title: '',
      content: '',
    });
    navigate('/');
  };

  return (
    <div className="w-full max-w-sm px-3 py-5 text-gray-900 bg-white rounded-md shadow-md sm:px-5">
      <h1 className="mb-4 text-xl font-extrabold">
        <span className="block">Hey,</span>
        <span className="block">Post Now.</span>
      </h1>

      <div className="flex flex-col items-start justify-start gap-4 mb-4 font-bold text-gray-500 sm:gap-1 sm:flex-row">
        <p>
          If you are new/{' '}
          <Link to="/signup" className="text-gray-800">
            Create New
          </Link>{' '}
          Or
        </p>
        <p>
          <Link to="/signin" className="text-gray-800">
            Login Now
          </Link>
        </p>
      </div>

      <form className="mb-4" onSubmit={onSubmit}>
        <div className="px-2 py-4 mb-4 bg-gray-100 rounded-md">
          <div className="my-3 mt-0">
            <input
              className="w-full px-2 py-2 text-lg text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-400 outline-none caret-red-500 focus:text-white focus:bg-gray-900 focus:rounded-md focus:placeholder-red-500"
              type="text"
              name="title"
              id="title"
              placeholder="title"
              autoComplete="off"
              value={title}
              onChange={onChange}
            />
          </div>
          <div className="my-3">
            <textarea
              className="w-full px-2 py-2 text-lg text-gray-900 placeholder-gray-400 bg-transparent border-b border-gray-400 outline-none caret-red-500 focus:text-white focus:bg-gray-900 focus:rounded-md focus:placeholder-red-500"
              cols="50"
              rows="8"
              maxLength={250}
              name="content"
              id="content"
              placeholder="Start writing..."
              autoComplete="off"
              value={content}
              onChange={onChange}
              required={true}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-red-500 rounded-md shadow-md"
        >
          Create Post
        </button>
      </form>

      <p className="flex items-center justify-start gap-4 font-bold text-gray-500">
        Want to go home?/{' '}
        <button
          onClick={() => navigate('/')}
          className="font-bold text-gray-800 border-0 outline-none"
        >
          Back Home
        </button>
      </p>
    </div>
  );
};

export default NewPost;
