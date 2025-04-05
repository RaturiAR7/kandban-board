import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "../constants/types";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { TaskStatus } from "../constants/types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  addTaskHandler: (
    title: string,
    description: string,
    columnId: TaskStatus
  ) => void;
  deleteTaskHandler: (taskId: string) => void;
};
const Column = ({
  column,
  tasks,
  addTaskHandler,
  deleteTaskHandler,
}: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className='flex w-80 min-h-28 flex-col rounded-xl bg-[#2C2C2C] p-4'>
      <h2 className='mb-4 font-semibold text-neutral-100 text-xl'>
        {column.title}
      </h2>
      <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              deleteTaskHandler={(taskId) => () => deleteTaskHandler(taskId)}
            />
          );
        })}
        <AddTask addTaskHandler={addTaskHandler} columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
