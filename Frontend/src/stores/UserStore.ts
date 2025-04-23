import { create } from "zustand";

type UserStore = {
  user: {
    _id: string;
    name: string;
    email: string;
    boards: object[];
    createdAt: string;
    updatedAt: string;
  } | null;
  setUser: (user: UserStore["user"]) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  triggerUserFetch: boolean;
  setTriggerUserFetch: (trigger: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  triggerUserFetch: false,
  setTriggerUserFetch: (trigger) => set({ triggerUserFetch: trigger }),
}));
