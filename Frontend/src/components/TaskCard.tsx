import { useDraggable } from "@dnd-kit/core";
import { Task } from "../constants/types";
import { deleteIcon } from "../constants/icons";

type TaskCardProps = {
  task: Task;
  deleteTaskHandler: (taskId: string) => () => void;
};
const TaskCard = ({ task, deleteTaskHandler }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div className=''>
      <img
        src={deleteIcon}
        className='w-5 h-5 cursor-pointer'
        onClick={() => deleteTaskHandler(task.id)}
      />
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className='cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md'
      >
        <div>
          <h3 className='font-medium text-neutral-100'>{task.title}</h3>
          <p className='mt-2 text-sm text-neutral-400'>{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
