import { create } from "zustand";

type BoardStore = {
  board: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    tasks: object[];
    user: string;
  };
  boards: {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    tasks: object[];
    user: string;
  }[];
  setBoards: (boards: BoardStore["boards"]) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  board: {
    _id: "",
    title: "",
    description: "",
  },
  boards: [],
  setBoards: (boards) => set({ boards }),
}));
