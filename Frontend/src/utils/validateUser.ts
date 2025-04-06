import { getUser } from "../apis/userApi";

const validateUser = async () => {
  ////Check if token exists
  const token = localStorage.getItem("token");
  if (token) {
    const userInfo = await getUser(token);
    if (userInfo) {
      return userInfo;
    } else {
      return null;
    }
  }
};
export { validateUser };
