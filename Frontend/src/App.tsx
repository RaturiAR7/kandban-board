import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "./apis/userApi";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as per your backend
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [triggerUserFetch, setTriggerUserFetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userInfo: User | null = await getUser(token);
          if (userInfo) {
            setIsAuthenticated(true);
            setUser(userInfo);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, [triggerUserFetch]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-[#1E1E1E] text-white'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={isAuthenticated ? <Dashboard user={user} /> : <Register />}
        />
        <Route
          path='/login'
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setTriggerUserFetch={setTriggerUserFetch}
            />
          }
        />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            isAuthenticated ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/board/:boardId'
          element={
            isAuthenticated ? (
              <KanbanBoard user={user} />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
