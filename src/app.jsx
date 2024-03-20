/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from 'react';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { es } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';
import { supabase } from './utils/supabase';

export default function App() {
  useScrollToTop();

  const queryClient = new QueryClient();
  const [todos, setTodos] = useState([]);
  setDefaultOptions({ weekStartsOn: 1 });

  useEffect(() => {
    async function getTodos() {
      const { data } = await supabase.from('exercise').select();

      if (data.length > 1) {
        setTodos(data);
      }
    }

    getTodos();
  }, []);

  console.log(todos);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <Router />
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
