import { useState } from "react";
import { Task, TaskStatus } from "../types";

interface AddTaskProps {
  addTaskHandler: (
    title: string,
    description: string,
    columnId: Task["status"]
  ) => void;
  columnId: TaskStatus;
}
const AddTask = ({ addTaskHandler, columnId }: AddTaskProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <form
      className='bg-neutral-700 text-white flex justify-center flex-col items-center'
      onSubmit={(e) => {
        e.preventDefault();
        addTaskHandler(title, description, columnId);
      }}
    >
      <h2>ADD TASK</h2>
      <label htmlFor='title' className='flex gap-2'>
        Title:
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor='description' className='flex gap-2'>
        Description:
        <input
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button className='border-2 border-black'>Add Task</button>
    </form>
  );
};

export default AddTask;
