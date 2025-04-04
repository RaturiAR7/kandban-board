import { Column as ColumnType, Task } from "../types";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};
const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <div className='flex w-80 flex-col rounded-lg bg-neutral-800 p-4'>
      <h2 className='mb-4 font-semibold text-neutral-100'>{column.title}</h2>
      <div className='flex flex-1 flex-col gap-4'></div>
    </div>
  );
};

export default Column;
