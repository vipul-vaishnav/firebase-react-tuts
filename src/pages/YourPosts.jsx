import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  updateDoc,
  arrayRemove,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';

const YourPosts = () => {
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

    const showArr = [];

    const getData = async () => {
      const userData = query(collection(db, 'users'), where('email', '==', userProfile.email));
      const userSnapshot = await getDocs(userData);
      const userPostArr = [];
      userSnapshot.forEach((user) => {
        user.data().posts.forEach((post) => {
          userPostArr.unshift(post);
        });
      });

      const postData = query(collection(db, 'posts'), orderBy('posted_at', 'desc'));
      const querySnapshot = await getDocs(postData);
      const postArr = [];
      querySnapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          ...doc.data(),
        };
        postArr.push(post);
      });

      userPostArr.forEach((post) => {
        postArr.forEach((postData) => {
          if (postData.id === post) {
            showArr.unshift(postData);
          }
        });
      });

      setPosts(showArr);
      console.clear();
    };

    getData();
  }, [userProfile]);

  const editPost = (e) => {
    e.preventDefault();
  };

  const deletePost = async (id) => {
    const docRef = doc(db, 'users', userProfile.email);

    try {
      // removing post form user post array
      await updateDoc(docRef, {
        posts: arrayRemove(id),
      });
      alert('Post deleted successfully');

      // deleting post
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      console.log(error.message);
    }
  };

  if (auth.currentUser === null) {
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
    <div className="w-full text-white">
      <h1 className="text-2xl font-extrabold text-red-500 ">
        {userProfile?.displayName} <span className="text-gray-400">'s Posts</span>{' '}
      </h1>
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

              <div className="flex flex-col gap-2 mt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={editPost}
                  className="px-8 py-2 text-base font-bold text-red-500 bg-gray-800 border-0 rounded-md shadow-lg sm:text-lg outline-0"
                >
                  Edit Post
                </button>
                <button
                  type="button"
                  onClick={() => deletePost(post.id)}
                  className="px-8 py-2 text-base font-bold text-red-500 bg-gray-800 border-0 rounded-md shadow-lg sm:text-lg outline-0"
                >
                  Delete Post
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default YourPosts;
