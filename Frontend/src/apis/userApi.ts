import axios from "axios";

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

export { getUser };
