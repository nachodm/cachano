import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Step from '@mui/material/Step';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

function PersonalInformationStep({ register }) {
  return (
    <div>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="Name"
        fullWidth
        variant="standard"
        inputProps={{ ...register('name') }}
      />
      <TextField
        required
        margin="dense"
        id="surname"
        name="surname"
        label="Surname"
        fullWidth
        variant="standard"
        inputProps={{ ...register('surname') }}
      />
      <TextField
        required
        margin="dense"
        id="main-events"
        name="main-events"
        label="Main Events"
        fullWidth
        variant="standard"
        inputProps={{ ...register('main-events') }}
      />
      {/* <TextField
        required
        margin="dense"
        id="birthday"
        name="birthday"
        label="Birthday"
        type="date"
        fullWidth
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ ...register('birthday') }}
      /> */}
    </div>
  );
}
PersonalInformationStep.propTypes = {
  register: PropTypes.func.isRequired,
};

function PersonalBestStep({ register }) {
  return (
    <div>
      <TextField
        margin="dense"
        id="60m"
        name="60m"
        label="60m"
        fullWidth
        variant="standard"
        inputProps={{ ...register('60m') }}
      />
      <TextField
        margin="dense"
        id="100m"
        name="100m"
        label="100m"
        fullWidth
        variant="standard"
        inputProps={{ ...register('100m') }}
      />
      <TextField
        margin="dense"
        id="150m"
        name="150m"
        label="150m"
        fullWidth
        variant="standard"
        inputProps={{ ...register('150m') }}
      />
      <TextField
        margin="dense"
        id="200m"
        name="200m"
        label="200m"
        fullWidth
        variant="standard"
        inputProps={{ ...register('200m') }}
      />
      <TextField
        margin="dense"
        id="300m"
        name="300m"
        label="300m"
        fullWidth
        variant="standard"
        inputProps={{ ...register('300m') }}
      />
      <TextField
        margin="dense"
        id="400m"
        name="400m"
        label="400m"
        fullWidth
        variant="standard"
        inputProps={{ ...register('400m') }}
      />
    </div>
  );
}
PersonalBestStep.propTypes = {
  register: PropTypes.func.isRequired,
};

export default function NewUserForm({ open, onClose, onSubmit }) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = (data) => {
    console.log('data', data);
    // Llama a la función onSubmit pasando los datos del formulario
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('welcome')}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ pb: '1em' }}>{t('new-user-form-message')}</DialogContentText>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="Personal Information">
            <StepLabel>Personal Information</StepLabel>
          </Step>
          <Step key="Personal Best">
            <StepLabel>Personal Best</StepLabel>
          </Step>
        </Stepper>
        <form onSubmit={handleSubmit(handleFinish)}>
          {activeStep === 0 && <PersonalInformationStep register={register} />}
          {activeStep === 1 && <PersonalBestStep register={register} />}
        </form>
      </DialogContent>
      <DialogActions>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
        <Button
          variant="contained"
          type="submit"
          onClick={activeStep === 0 ? handleNext : handleSubmit(handleFinish)}
        >
          {activeStep === 1 ? 'Finish' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewUserForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
