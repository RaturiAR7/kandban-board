import { useEffect, useState } from "react";
import type { Task, Column as ColumnType } from "../constants/types";
import Column from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { createTask, fetchTasks } from "../apis/taskApi";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];
const KanbanBoard = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks("67f177cba6d2acc793cfb9f5");
      setTasks(data);
    };
    loadTasks();
  }, []);

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
    await createTask(
      { title, description, status: columnId },
      "67f177cba6d2acc793cfb9f5"
    );
  };
  const deleteTaskHandler = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center '>
      <DndContext onDragEnd={handleDragEnd}>
        <div className='w-full h-full flex justify-center items-center gap-6 '>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                addTaskHandler={addTaskHandler}
                deleteTaskHandler={deleteTaskHandler}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
