import KanbanBoard from "./components/KanbanBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <div className='p-4 bg-[#1E1E1E] min-h-screen h-full flex justify-center items-center'>
          <KanbanBoard />
        </div>
      </Routes>
    </Router>
  );
};

export default App;
