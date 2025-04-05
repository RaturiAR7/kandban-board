import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "../types";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  addTaskHandler: (title: string, description: string) => void;
};
const Column = ({ column, tasks, addTaskHandler }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className='flex w-80 min-h-28 flex-col rounded-lg bg-neutral-800 p-4'>
      <h2 className='mb-4 font-semibold text-neutral-100'>{column.title}</h2>
      <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
      <AddTask addTaskHandler={addTaskHandler} columnId={column.id} />
    </div>
  );
};

export default Column;
