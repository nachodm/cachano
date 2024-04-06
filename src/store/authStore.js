import { create } from 'zustand';

import { supabase } from 'src/utils/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassWord({ email, password });
    if (error) throw error;
    set({ user });
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
  loadUserInfo: async () => {
    const { user } = useAuthStore.getState();
    if (user.email) {
      const { data } = await supabase
        .from('profiles')
        .select('first_name, last_name, email, nationality, main_events, coach, showNewUserForm')
        .eq('email', user.email)
        .maybeSingle();
      const fullUserInfo = {
        ...user,
        ...data,
        displayName: [data.first_name, data.last_name].join(' '),
      };
      set({ user: fullUserInfo });
    }
  },
}));
