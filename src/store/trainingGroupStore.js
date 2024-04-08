import { create } from 'zustand';
import { addDays } from 'date-fns';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from './authStore';

export const useTrainingGroupStore = create((set) => ({
  weekTrainingSessions: null,
  setWeekTrainingSessions: (sessions) => set({ sessions }),
  loadWeekTrainingSessions: async (date) => {
    const { user } = useAuthStore.getState();
    if (user.id) {
      const { data } = await supabase
        .from('training')
        .select()
        .gte('date', date.toISOString())
        .lte('date', addDays(date, 6).toISOString())
        .eq('group', user.group_affiliation)
        .contains('assigned_athletes', [user.id]);

      set({ weekTrainingSessions: data });
    }
  },
  insertNewWeekTrainingSessions: async (newWeekTrainingSessions) => {
    const { user } = useAuthStore.getState();
    if (user.id) {
      const { data, error } = await supabase
        .from('training')
        .insert(newWeekTrainingSessions)
        .select();
      if (error) throw error;
      else console.log('successfully inserted', data);
    }
  },
}));
