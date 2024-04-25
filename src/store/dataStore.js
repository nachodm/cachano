import { create } from 'zustand';

export const useExerciseStore = create((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
}));
