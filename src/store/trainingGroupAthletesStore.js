import { create } from 'zustand';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from './authStore';

export const useTrainingGroupAthletesStore = create((set) => ({
  trainingGroupAthletes: null,
  setTrainingGroupAthletes: (sessions) => set({ sessions }),
  loadTrainingGroupAthletes: async () => {
    const { user } = useAuthStore.getState();
    if (user.id) {
      const { data } = await supabase.from('profiles').select().eq('group', user.group_affiliation);

      set({ trainingGroupAthletes: data });
    }
  },
}));
