import { createStore } from 'zustand';

export const useStore = createStore((set) => ({
  loggedUser: null,
}));
