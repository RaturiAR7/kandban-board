import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token); // Debugging: Check if the token exists
  return token ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
