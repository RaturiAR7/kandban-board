// @ts-nocheck

import axios from "axios";
import { BASE_URL } from "../constants/URL";

interface RegisterUserParams {
  name?: string;
  email: string;
  password: string;
}

const registerUser = async ({ name, email, password }: RegisterUserParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/`, {
      name,
      email,
      password,
    });
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};
const loginUser = async ({ email, password }: RegisterUserParams) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return response;
  } catch (err: any) {
    console.log(err.response);
    return err.response;
  }
};

const getUser = async (token) => {
  try {
    if (!token) return null;
    const response = await axios.get(`${BASE_URL}/users/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    if (axios.isAxiosError(error)) {
      return error.response;
    }
    console.error("Unexpected error:", error);
    return null;
  }
};

export { getUser, registerUser, loginUser };
