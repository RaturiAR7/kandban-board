import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../apis/boardApi";
import { getUser } from "../apis/userApi";

// Define the type for a Board
interface Board {
  _id: string;
  title: string;
  description: string;
}

interface DashboardProps {
  user: {
    boards: Board[];
  } | null; // Allow user to be null initially
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [error, setError] = useState<string>(""); // State for error messages
  const navigate = useNavigate();

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`); // Navigate to the specific board
  };
  const boardCreateHandler = async () => {
    try {
      const response = await createBoard("New Board", "Description", user?._id);
      const token = localStorage.getItem("token");
      const responseUser = await getUser(token); // Fetch updated user data after creating a board

      setUser(responseUser); // Update user state with the new board
      console.log(response);
    } catch (error) {
      console.error("Error creating board:", error);
      setError("Failed to create board. Please try again."); // Set error message on failure
    }
  };
  if (!user) return <p className='text-red-500'>No boards available</p>; // Handle case where boards are not available

  return (
    <div className='min-h-screen bg-[#1E1E1E] text-white p-6'>
      <h1 className='text-3xl font-bold mb-6'>Your Boards</h1>
      <button
        onClick={() => boardCreateHandler()}
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
      >
        Create New Board
      </button>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid bg-[#2E2E2E] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {user?.boards.map((board) => (
          <div
            key={board}
            className='p-4 bg-[#2E2E2E] rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            {/* <h2 className='text-xl font-semibold mb-2'>{board.title}</h2>
            <p className='text-gray-400 mb-4'>{board.description}</p> */}
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
