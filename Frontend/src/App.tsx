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
import Hero from "./components/Hero";
import NotFound from "./components/NotFound";
import Test from "./components/common/Test";
import { useUserStore } from "./stores/UserStore";
import Loader from "./components/common/Loader";

interface Board {
  _id: string;
  title: string;
  description: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  boards: Board[]; // Add boards property to match DashboardProps
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { setUser, isAuthenticated, setIsAuthenticated, triggerUserFetch } =
    useUserStore((state) => state);

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
  }, [triggerUserFetch, setIsAuthenticated, setUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Dashboard /> : <Hero />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/board/:boardId'
          element={
            isAuthenticated ? <KanbanBoard /> : <Navigate to='/login' replace />
          }
        />
        {/* Catch-all route for non-existent paths */}
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
