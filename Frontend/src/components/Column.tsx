import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Task, Column as ColumnType } from "../constants/types";
import TaskCard from "./TaskCard";
import { updateTask } from "../apis/taskApi";
import { TASK_INPUT_FIELDS } from "../constants/types";
import Modal from "./common/Modal";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  addTaskHandler: (
    title: string,
    description: string,
    columnId: Task["status"],
    priority: string
  ) => void;
  deleteTaskHandler: (id: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  addTaskHandler,
  deleteTaskHandler,
  setTasks,
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "High",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTask = (e: Event) => {
    e.preventDefault();
    console.log("FormData", formData);
    if (formData.title.trim() && formData.title.trim() && formData.priority) {
      addTaskHandler(
        formData.title,
        formData.description,
        column.id,
        formData.priority
      );
      setFormData({
        title: "",
        description: "",
        priority: "High",
      });
    }
    setIsModalOpen(false);
  };

  interface UpdateTaskData {
    title: string;
    description: string;
  }

  const updateTaskHandler = async (
    taskId: string,
    data: UpdateTaskData
  ): Promise<void> => {
    await updateTask(taskId, "", data.title, data.description);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        return task.id === taskId ? { ...task, ...data } : task;
      })
    );
  };

  return (
    <div
      ref={setNodeRef}
      className='flex flex-col bg-gray-800 rounded-lg shadow-lg p-4 w-80 hover:shadow-2xl transition-shadow'
    >
      <h2 className='text-2xl font-bold text-center mb-4'>{column.title}</h2>
      <div className='flex flex-col gap-4'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTaskHandler={deleteTaskHandler}
            updateTaskHandler={(taskId, data) =>
              updateTaskHandler(taskId, data)
            }
          />
        ))}
      </div>
      <div className='mt-4'>
        {isModalOpen && (
          <Modal
            title='Enter Task'
            fields={TASK_INPUT_FIELDS}
            onClose={toggleModal}
            data={formData}
            setData={setFormData}
            onsubmitHandler={handleAddTask}
          />
        )}
        <button
          onClick={toggleModal}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Column;
