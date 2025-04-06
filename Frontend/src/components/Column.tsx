import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Task, Column as ColumnType } from "../constants/types";
import TaskCard from "./TaskCard";

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

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      addTaskHandler(newTaskTitle, newTaskDescription, column.id);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  return (
    <div
      ref={setNodeRef}
      className='flex flex-col bg-gray-800 rounded-lg shadow-lg p-4 w-80'
    >
      <h2 className='text-2xl font-bold text-center mb-4'>{column.title}</h2>
      <div className='flex flex-col gap-4'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTaskHandler={deleteTaskHandler}
          />
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
