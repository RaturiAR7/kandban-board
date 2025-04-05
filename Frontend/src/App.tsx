
import KanbanBoard from "./components/KanbanBoard";



const App = () => {

  return (
    <div className='p-4 bg-black min-h-screen'>
      <div className='flex gap-8'>
        <KanbanBoard />
      </div>
    </div>
  );
};

export default App;
