import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const handleSave = () => {
    if (!isLoggedIn) {
      console.log('User not logged in');
      history.push('/login');
      return;
    }

    const newNote = {
      title,
      content,
      bgColor: 'bg-gray-300', // Default color, change as needed
    };

    // Simulated saving the note (replace with actual API call)
    console.log('Note saved:', newNote);
    history.push('/');
  };

  return (
    <div className="h-screen bg-bg-black text-font-main font-Mulish flex justify-center items-center">
      <div className="p-4 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 bg-bg-black rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-font-main">Create a New Note</h1>
        <input
          type="text"
          className="outline-none w-full p-4 my-3 rounded-lg border border-gray-700 bg-bg-black text-lg"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="outline-none w-full p-4 my-3 rounded-lg border border-gray-700 bg-bg-black text-lg"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="w-full p-4 my-3 rounded-lg text-black font-bold text-xl bg-font-main"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Create;
