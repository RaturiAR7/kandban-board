import { useEffect, useState } from "react";
import type { Task, Column as ColumnType } from "../constants/types";
import Column from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { createTask, fetchTasks } from "../apis/taskApi";
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
      const data = await fetchTasks(boardId, token);
      setTasks(data);
    };
    loadTasks();
  }, [boardId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTaskHandler = async (
    title: string,
    description: string,
    columnId: Task["status"]
  ) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Math.random().toString(36).substring(2, 15),
        title,
        description,
        status: columnId,
      },
    ]);
    const token = localStorage.getItem("token");
    await createTask({ title, description, status: columnId }, boardId, token);
  };

  const deleteTaskHandler = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className='w-full h-full flex flex-col bg-gradient-to-r from-gray-800 to-gray-900 text-white'>
      {/* Header */}
      <header className='w-full p-6 bg-gray-700 shadow-md'>
        <h1 className='text-4xl font-bold text-center'>Kanban Board</h1>
        <p className='text-center text-gray-300 mt-2'>
          Organize your tasks efficiently with drag-and-drop functionality.
        </p>
      </header>

      {/* Kanban Columns */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className='w-full flex justify-center items-start gap-6 p-6 overflow-x-auto'>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              addTaskHandler={addTaskHandler}
              deleteTaskHandler={deleteTaskHandler}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
