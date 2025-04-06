import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./utils/protectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route
          path='/kanban'
          element={
            // <ProtectedRoute>
            <KanbanBoard />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
