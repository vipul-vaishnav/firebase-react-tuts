import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreatePostBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/newpost')}
      className="fixed flex items-center justify-center text-2xl text-white bg-red-500 rounded-full shadow-xl bottom-24 right-4 w-14 h-14"
    >
      <FaPlus />
    </button>
  );
};

export default CreatePostBtn;
