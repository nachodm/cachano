import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from 'src/store/authStore';

import Loader from 'src/components/loader';

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
      await setUser(data.user ?? null);
      setAuth(!!data.user);
      setLoading(false);
    };

    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuth(false);
      } else if (event === 'SIGNED_IN') {
        await setUser(session.user);
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

  const handleSignIn = useCallback(
    async (email, password) => {
      try {
        const signInUser = await signIn(email, password);
        await setUser(signInUser);
        setAuth(true);
        navigate('/');
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
      }
    },
    [signIn, setUser, navigate]
  );

  const value = useMemo(
    () => ({
      auth,
      user,
      handleSignIn,
      signOut,
      passwordReset,
      updatePassword,
    }),
    [auth, user, handleSignIn, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{loading ? <Loader /> : children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
