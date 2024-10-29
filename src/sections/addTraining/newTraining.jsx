import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TrainingItem from './trainingItem';
import General from './trainingInputs/general';
import Pyramid from './trainingInputs/pyramid';
import Plyometrics from './trainingInputs/plyometrics';
import DescriptionOnly from './trainingInputs/descriptionOnly';

export default function NewTraining(props) {
  const { title, subheader, exerciseTypes } = props;
  const { handleSubmit, control, reset, formState, watch, register } = useForm();
  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const trainingType = watch('type');
  const areAllFieldsFilled = formState.isValid;

  const onSubmit = (data) => {
    setList((prevExercises) => [...prevExercises, data]);
    reset();
  };

  const displayCorrectInput = () => {
    switch (trainingType) {
      case 'Calentamiento':
        return <DescriptionOnly control={control} />;
      case 'Pirámide':
        return <Pyramid control={control} series={[60, 80, 100, 200, 300, 400]} />;
      case 'Pliometría':
        return <Plyometrics control={control} />;
      default:
        return <General control={control} />;
    }
  };

  return (
    <Card sx={{ my: 2, width: '100%' }}>
      <CardHeader
        title={title}
        sx={{ pb: 2 }}
        subheader={subheader}
        action={
          <IconButton color="black" onClick={() => setCollapsed(!collapsed)}>
            <Iconify icon={collapsed ? 'mdi:plus' : 'mdi:minus'} />
          </IconButton>
        }
      />
      <Collapse in={!collapsed}>
        <CardContent>
          {list.length > 0 && (
            <>
              <Scrollbar>
                <Stack spacing={3} sx={{ p: 1, pr: 0, pt: 0 }}>
                  {list.map((training, i) => (
                    <TrainingItem key={`training-${i}`} training={training} />
                  ))}
                </Stack>
              </Scrollbar>

              <Divider sx={{ borderStyle: 'dashed' }} />
            </>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} sx={{ p: 3 }}>
              <Grid item xs={4} lg={2}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      onChange={(event, value) => field.onChange(value)}
                      onInputChange={(_, data) => {
                        if (data) field.onChange(data);
                      }}
                      options={exerciseTypes}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tipo"
                          fullWidth
                          {...register('type', {
                            required: 'Required field',
                          })}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              {displayCorrectInput()}
              <Grid item xs={1}>
                <IconButton color="success" type="submit" disabled={!areAllFieldsFilled}>
                  <Iconify icon="material-symbols:check-circle" />
                </IconButton>
              </Grid>
            </Grid>
            <Box sx={{ p: 1, textAlign: 'right' }}>
              <Button size="small" color="inherit" startIcon={<Iconify icon="mdi:plus" />}>
                Save
              </Button>
            </Box>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

NewTraining.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  exerciseTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
