export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id?: string;
  _id?: object;
  title: string;
  description: string;
  priority: string;
  createdAt: string;
  status: string;
};
export type Column = {
  id: TaskStatus;
  title: string;
};
export type TaskInputField = {
  name: string;
  label: string;
  type: string;
  options?: string[]; // Optional for select fields
  placeholder?: string; // Optional for input fields
};

export const TASK_INPUT_FIELDS = [
  {
    name: "title",
    label: "Task Title",
    type: "text",
  },
  {
    name: "description",
    label: "Task Description",
    type: "text",
  },
  {
    name: "priority",
    label: "Task Priority",
    type: "select",
    options: ["High", "Medium", "Low"],
  },
];
