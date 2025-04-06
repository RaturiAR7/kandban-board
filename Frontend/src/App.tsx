import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   const validateUser = async () => {
  //     ////Check if token exists
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       setIsAuthenticated(true);
  //       let userInfo = await getUser(token);
  //       if (userInfo) {
  //         setUser(userInfo); // Set user data if needed
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     }
  //   };
  //   validateUser();
  // }, []);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route path='/kanban' element={<KanbanBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
