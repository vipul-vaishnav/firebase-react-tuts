import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import CreatePostBtn from '../components/CreatePostBtn';

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserProfile(user);
      } else {
        console.log('User not logged in');
      }
    });

    const getData = async () => {
      const q = query(collection(db, 'posts'), orderBy('posted_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const postArr = [];
      querySnapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          ...doc.data(),
        };
        postArr.push(post);
      });
      setPosts(postArr);
    };

    getData();
  }, []);

  if (userProfile === null) {
    return (
      <div className="flex flex-col gap-4 md:text-center">
        <h1 className="text-4xl font-extrabold text-red-500 ">User not logged in</h1>
        <p className="text-lg font-semibold">
          <Link to="/signin" className="text-red-500">
            Login Now
          </Link>{' '}
          Or{' '}
          <Link className="text-red-500" to="/signup">
            Create a new account
          </Link>{' '}
          to see your feed
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full max-w-lg">
        <h1 className="w-full px-4 py-5 mb-8 text-lg font-bold text-gray-100 bg-gray-600 rounded-md shadow-lg sm:text-2xl">
          Welcome Back!, <span className="text-red-500">{userProfile?.displayName}</span>
        </h1>

        <div className="text-white">
          <ul>
            {posts.map((post) => {
              return (
                <li
                  key={uuidv4()}
                  className="px-4 py-4 my-6 text-gray-100 bg-gray-900 rounded-md sm:p-6"
                >
                  <div className="mb-3">
                    <h1 className="mb-1 text-2xl font-extrabold">{post.title}</h1>
                    <h2 className="text-lg font-bold text-gray-500">@{post.name}</h2>
                  </div>

                  <p className="mb-4">{post.content}</p>

                  <div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center justify-start gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-start gap-2 text-gray-300"
                      >
                        <span>
                          <FaRegThumbsUp />
                          {/* <FaThumbsUp /> */}
                        </span>
                        <span>{post.likes}</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-start gap-2 text-gray-300"
                      >
                        <span>
                          <FaRegThumbsDown />
                          {/* <FaThumbsDown /> */}
                        </span>
                        <span>{post.dislikes}</span>
                      </button>
                    </div>

                    <div>
                      <p className="text-red-500">
                        {new Date(post.posted_at.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <CreatePostBtn />
    </>
  );
};

export default Home;
