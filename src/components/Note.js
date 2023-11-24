import { useHistory } from 'react-router-dom';
import FullNote from './FullNote';
const Note = ({ bgColor, note }) => {
  const history = useHistory();
  console.log(`Component: ${bgColor}`);
  console.log('Note data:', note);

  return (
    <div
      className={`cursor-pointer w-full p-4 mb-4 ${bgColor} text-bg-black rounded-lg sm:w-1/4 sm:inline-block sm:mr-4 md:w-1/5`}
      onClick={() => history.push(`/${note._id}`)}
    >
      {/* TITLE */}
      <h3 className="text-2xl font-semibold truncate">{note.title}</h3>
      <p className="mt-3 h-6 truncate sm:h-20 sm:overflow-hidden sm:whitespace-normal">
        {note.content}
      </p>
    </div>
  );
};

export default Note;
