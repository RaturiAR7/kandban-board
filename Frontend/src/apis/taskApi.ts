// @ts-nocheck

import axios from "axios";
import { BASE_URL } from "../constants/URL";

export const fetchTasks = async (boardId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const createTask = async (
  data: object,
  boardId: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/tasks/create`,
      {
        title: data.title,
        description: data.description,
        boardId,
        status: data.status,
        priority: data.priority,
      },
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

export const deleteTask = async (taskId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    const response = await axios.post(
      `${BASE_URL}/tasks/delete`,
      {
        taskId,
      },
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

export const updateTask = async (
  taskId: string,
  status?: string,
  title?: string,
  description?: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    const response = await axios.post(
      `${BASE_URL}/tasks/update`,
      {
        taskId,
        status,
        title,
        description,
      },
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
