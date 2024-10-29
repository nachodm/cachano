import { useState, useContext, useCallback, createContext } from 'react';

import { Alert, Snackbar } from '@mui/material';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showAlert = useCallback(
    (newMessage, newSeverity = 'info') => {
      setMessage(newMessage);
      setSeverity(newSeverity);
      setOpen(true);
    },
    [setMessage, setSeverity, setOpen]
  );

  const hideAlert = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={hideAlert} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
