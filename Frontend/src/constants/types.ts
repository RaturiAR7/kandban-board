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
