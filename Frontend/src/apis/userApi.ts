// @ts-nocheck

import axios from "axios";

interface RegisterUserParams {
  name?: string;
  email: string;
  password: string;
}

const registerUser = async ({ name, email, password }: RegisterUserParams) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/", {
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
    const response = await axios.post("http://localhost:5000/api/users/login", {
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
    const response = await axios.get("http://localhost:5000/api/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User data:", response.data);
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
