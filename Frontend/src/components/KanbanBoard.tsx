import { useEffect, useState } from "react";
import type { Task, Column as ColumnType } from "../constants/types";
import Column from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../apis/taskApi";
import { useParams } from "react-router-dom";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { boardId } = useParams();

  useEffect(() => {
    const loadTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (!boardId) {
        console.error("Board ID is undefined");
        return;
      }
      const data = await fetchTasks(boardId, token);
      setTasks(data);
    };
    loadTasks();
  }, [boardId]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    const res = await updateTask(taskId, newStatus);
    if (res.status !== 200) {
      console.error("Failed to update task status:", res.data.message);
    }
  };

  const addTaskHandler = async (
    title: string,
    description: string,
    columnId: Task["status"],
    priority: string
  ) => {
    const token = localStorage.getItem("token");
    const data = await createTask(
      { title, description, status: columnId, priority },
      boardId!,
      token!
    );
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...data.task, id: data.task._id.toString() },
    ]);
  };

  const deleteTaskHandler = async (id: string) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className='w-full min-h-screen flex flex-col bg-gradient-to-r from-gray-500 to-gray-700 text-white'>
      {/* Header */}
      <header className='w-full p-6 bg-gray-700 shadow-md'>
        <h1 className='text-4xl font-bold text-center'>Kanban Board</h1>
        <p className='text-center text-gray-300 mt-2'>
          Organize your tasks efficiently with drag-and-drop functionality.
        </p>
      </header>

      {/* Kanban Columns */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className='kanban-columns-container'>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              addTaskHandler={addTaskHandler}
              deleteTaskHandler={deleteTaskHandler}
              setTasks={setTasks}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
