import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';

import { supabase } from 'src/utils/supabase';

export default function AddNewUser(props) {
  const { open, handleClose } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          setLoading(true);
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const { email } = formJson;
          const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
          if (error) {
            setSeverity('error');
            setSubmitted(true);
          }
          if (data) {
            setSeverity('success');
            setSubmitted(true);
            handleClose();
          }
        },
      }}
    >
      <DialogTitle>{t('add-user')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('add-new-user-description')}</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button type="submit" disabled={loading}>
          {loading ? <CircularProgress /> : t('invite')}
        </Button>
      </DialogActions>

      <Alert severity={severity} autoHideDuration={3000} open={submitted}>
        {severity === 'success' ? t('success-message') : t('error-message')}
      </Alert>
    </Dialog>
  );
}

AddNewUser.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
