import axios from "axios";

export const fetchTasks = async (boardId: string, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/tasks/board/${boardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const tasks = response.data.map((task: any) => ({
      ...task,
      id: task._id.toString(), // Convert MongoDB ObjectId to string
    }));
    return tasks;
  } catch (error: any) {
    console.log(error.message);
    return error.response;
  }
};

export const createTask = async (data: object, boardId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/tasks/create`,
      {
        title: data.title,
        description: data.description,
        boardId,
        status: data.status,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error.response;
  }
};
