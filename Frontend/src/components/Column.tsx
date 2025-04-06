import { useState } from "react";
import type { Task, Column as ColumnType } from "../constants/types";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  addTaskHandler: (
    title: string,
    description: string,
    columnId: Task["status"]
  ) => void;
  deleteTaskHandler: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  addTaskHandler,
  deleteTaskHandler,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      addTaskHandler(newTaskTitle, newTaskDescription, column.id);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  return (
    <div className='flex flex-col bg-gray-800 rounded-lg shadow-lg p-4 w-80'>
      <h2 className='text-2xl font-bold text-center mb-4'>{column.title}</h2>
      <div className='flex flex-col gap-4'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <h3 className='text-lg font-semibold'>{task.title}</h3>
            <p className='text-gray-400'>{task.description}</p>
            <button
              onClick={() => deleteTaskHandler(task.id)}
              className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <input
          type='text'
          placeholder='Task Title'
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className='w-full p-2 mb-2 bg-gray-700 text-white rounded-md'
        />
        <textarea
          placeholder='Task Description'
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className='w-full p-2 bg-gray-700 text-white rounded-md'
        />
        <button
          onClick={handleAddTask}
          className='w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
