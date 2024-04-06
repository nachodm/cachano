import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, createContext } from 'react';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from 'src/store/authStore';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// const signUpNewUser = () => {
//   const { data, error } = supabase.auth.signUp({
//     email: 'example@email.com',
//     password: 'example-password',
//     options: {
//       emailRedirectTo: 'https://example.com/welcome',
//     },
//   });
// };

const passwordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/update-password',
  });

const updatePassword = (updatedPassword) => supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
  const { user, signIn, signOut, loadUserInfo, setUser } = useAuthStore((state) => ({
    user: state.user,
    signIn: state.signIn,
    setUser: state.setUser,
    signOut: state.signOut,
    loadUserInfo: state.loadUserInfo,
  }));
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setAuth(!!currentUser);
      setLoading(false);
    };
    getUser();
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuth(false);
      } else if (event === 'SIGNED_IN') {
        setUser(session.user);
        setAuth(true);
        loadUserInfo();
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [loadUserInfo, navigate, setUser]);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        auth,
        user,
        signIn,
        signOut,
        passwordReset,
        updatePassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
