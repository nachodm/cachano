import { create } from 'zustand';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from './authStore';

export const useUserStore = create((set) => ({
  personalBest: null,
  setPersonalBest: (personalBest) => set({ personalBest }),
  loadPersonalBest: async () => {
    const { user } = useAuthStore.getState();
    if (user.id) {
      const { data } = await supabase
        .from('personal_best')
        .select('record, exercise, date, user_id')
        .eq('user_id', user.id);

      set({ personalBest: data });
    }
  },
  insertNewPersonalBest: async (newPB) => {
    const { user } = useAuthStore.getState();
    if (user.id) {
      const { data, error } = await supabase.from('personal_best').insert(newPB).select();
      if (error) throw error;
      set({ personalBest: data });
    }
  },
}));
