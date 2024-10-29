import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, createContext } from 'react';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from 'src/store/authStore';

const AuthContext = createContext({});

export const UseAuth = () => useContext(AuthContext);

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
    redirectTo: 'https://cachano.vercel.app/update-password',
  });

const updatePassword = (updatedPassword) => supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
  const { user, signIn, signOut, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      await setUser(currentUser ?? null);
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
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [setUser, navigate]);

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
