import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TiDocumentAdd } from 'react-icons/ti';
import { CgLogOut } from 'react-icons/cg';

import { AuthContext } from '../context/AuthContext';
import Note from './Note';
import FullNote from './FullNote';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { username, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      // Simulated API endpoint
      const URL = `${process.env.REACT_APP_API_URL}/notes/FullNote`;

      // Simulated response data
      const mockNotes = [
        { _id: '1', title: 'Note 1', content: 'Content for Note 1', bgColor: 'bg-blue-200' },
        { _id: '2', title: 'Note 2', content: 'Content for Note 2', bgColor: 'bg-green-200' },
        // Add more mock notes as needed
      ];

      setNotes(mockNotes);
      setIsLoading(false);
    }
  }, [isLoggedIn, setIsLoading, setNotes]);

  const handleLogout = () => {
    // Simulated logout action
    console.log('Simulated logout');
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <div className="h-screen bg-bg-black text-font-main font-Mulish">
      <div className="p-4 flex justify-between items-center text-gray-300">
        <h2 className="text-3xl font-Mulish capitalize">{username}Home Notes App</h2>
        <div className="flex justify-around items-center">
          <div
            className="rounded-full transition ease-in-out duration-150 text-3xl p-2 flex justify-around items-center cursor-pointer transform hover:-translate-y-1"
            title="Log out"
            onClick={handleLogout}
          >
            <CgLogOut />
            <span className="hidden md:block ml-1 text-xl">Logout</span>
          </div>
          <div
            className="rounded-full transition ease-in-out duration-150 text-3xl p-2 flex justify-around items-center cursor-pointer transform hover:-translate-y-1"
            title="Add New Note"
            onClick={() => history.push('/create')}
          >
            <TiDocumentAdd />
            <span className="hidden md:block ml-1 text-xl">Add Note</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex-1 p-4 flex flex-col justify-start items-center flex-wrap sm:block">
          {notes.map((note) => {
            const bgColor = note.bgColor || 'bg-gray-300';

            return <Note key={note._id} bgColor={bgColor} note={note} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
