import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for a Board
interface Board {
  _id: string;
  title: string;
  description: string;
}

const Dashboard: React.FC = ({ user }) => {
  const [boards] = useState<Board[]>([user.boards]); // State for boards with type annotation
  const [error, setError] = useState<string>(""); // State for error messages
  const navigate = useNavigate();

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`); // Navigate to the specific board
  };

  return (
    <div className='min-h-screen bg-[#1E1E1E] text-white p-6'>
      <h1 className='text-3xl font-bold mb-6'>Your Boards</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {boards.map((board) => (
          <div
            key={board}
            className='p-4 bg-[#2E2E2E] rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <h2 className='text-xl font-semibold mb-2'>{board.title}</h2>
            <p className='text-gray-400 mb-4'>{board.description}</p>
            <button
              onClick={() => handleBoardClick(board)}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Open Board
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
