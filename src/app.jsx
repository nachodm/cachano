/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { es } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

export default function App() {
  useScrollToTop();

  const queryClient = new QueryClient();
  setDefaultOptions({ weekStartsOn: 1 });

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
