import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './i18n/i18n';
import App from './app';
import AuthProvider from './context/authProvider';
import { AlertProvider } from './context/alertProvider';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <AuthProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
