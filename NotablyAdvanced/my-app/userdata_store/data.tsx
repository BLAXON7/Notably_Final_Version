import { create } from "zustand";

export type userdatatype = {
  id: number;
  Email: string;
  Notecount: number;
  Course: string;
};

export const usedatastore = create<{
  user: userdatatype | null;
  setUser: (user: userdatatype) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
