// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard, deleteBoard, fetchBoards } from "../apis/boardApi";
import { getUser } from "../apis/userApi";
import BoardForm from "./Form"; // Import the reusable form component
import { useUserStore } from "../stores/UserStore";
import { useBoardStore } from "../stores/BoardStore";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const boards = useBoardStore((state) => state.boards);
  const setBoards = useBoardStore((state) => state.setBoards);

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  const handleCreateBoard = async (title: string, description: string) => {
    try {
      await createBoard(title, description, user?._id);
      const token = localStorage.getItem("token");
      const responseUser = await getUser(token); // Fetch updated user data after creating a board

      setUser(responseUser); // Update user state with the new board
    } catch (error) {
      console.error("Error creating board:", error);
      setError("Failed to create board. Please try again.");
    }
  };
  const handleBoardDelete = async (boardId: string) => {
    const updatedBoards = boards.filter((board) => board._id !== boardId);
    setBoards(updatedBoards);
    await deleteBoard(boardId);
  };

  useEffect(() => {
    const getBoards = async () => {
      const data = await fetchBoards(user?._id);
      if (!data) {
        setError("Failed to fetch boards. Please try again.");
      }
      setBoards(data);
    };
    getBoards();
  }, [user, setBoards]);
  console.log("Boards:", boards);

  if (!user) return <p className='text-red-500'>No boards available</p>;

  return (
    <div className='min-h-screen bg-[#1E1E1E] text-white p-10'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold mb-6'>Your Boards</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
          }}
          className='px-10 py-2 bg-red-500 text-white rounded-md hover:bg-red-700'
        >
          LogOut
        </button>
      </div>
      <BoardForm onSubmit={handleCreateBoard} text='Create New Board' />
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10'>
        {boards?.map((board) => (
          <div
            key={board._id}
            className='p-4 bg-[#2E2E2E] self-center rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <h2 className='text-xl font-semibold mb-2'>{board.title}</h2>
            <p className='text-gray-400 mb-4'>{board.description}</p>
            <div className='flex justify-between'>
              <button
                onClick={() => handleBoardClick(board._id)}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              >
                Open Board
              </button>
              <button
                onClick={() => handleBoardDelete(board._id)}
                className='px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-700'
              >
                Delete Board
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
