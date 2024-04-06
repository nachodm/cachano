import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

export default function EditDialog({ type, open, handleClose, data }) {
  let title;
  if (type === 'edit_personal_info') {
    title = 'Editar información personal';
  } else {
    title = 'Editar marcas personales';
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const { email } = formJson;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Actualizar estos datos puede verse reflejado en tu diario de entrenamiento.
        </DialogContentText>
        {data.map((item, i) => (
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name={item.field}
            label={item.field}
            type="string"
            fullWidth
            variant="standard"
            helperText={item.info}
            key={`item-${i}`}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      info: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};
