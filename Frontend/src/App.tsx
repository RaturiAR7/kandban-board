import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { validateUser } from "./utils/validateUser";
import { useEffect, useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const protectRoute = async () => {
      const user = await validateUser();
      if (!user) {
        setIsAuthenticated(false);
        setUser({});
      } else {
        setIsAuthenticated(true);
        setUser(user);
      }
    };
    protectRoute();
  }, []);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/'
          element={isAuthenticated ? <KanbanBoard user={user} /> : <Register />}
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
