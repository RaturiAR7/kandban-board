import axios from "axios";

interface BoardProps {
  userId: string;
  title?: string;
  description?: string;
}
export const createBoard = async (
  title,
  description,
  userId
): Promise<BoardProps> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    const response = await axios.post(
      "http://localhost:5000/api/boards/create",
      {
        title,
        description,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error.response;
  }
};

export const fetchBoards = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    const response = await axios.get(
      `http://localhost:5000/api/boards/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error.response;
  }
};

export const deleteBoard = async (boardId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    const response = await axios.delete(
      `http://localhost:5000/api/boards/delete/${boardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error.response;
  }
};
