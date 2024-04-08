import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export default function NewTraining(props) {
  const { title, subheader, exerciseTypes } = props;
  const { handleSubmit, control, reset, formState } = useForm();
  const setAndRepsOptions = Array.from({ length: 16 }, (_, index) => index);
  const [list, setList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const areAllFieldsFilled = formState.isValid;

  const onSubmit = (data) => {
    setList((prevExercises) => [...prevExercises, data]);
    reset();
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
              <Grid item xs={2}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      onChange={(event, value) => field.onChange(value)}
                      options={exerciseTypes}
                      renderInput={(params) => <TextField {...params} label="Tipo" fullWidth />}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="sets"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      onChange={(event, value) => field.onChange(value)}
                      options={setAndRepsOptions}
                      getOptionLabel={(option) => option.toString()}
                      renderInput={(params) => <TextField {...params} label="Bloques" fullWidth />}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={2}>
                <Controller
                  name="reps"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      onChange={(event, value) => field.onChange(value)}
                      options={setAndRepsOptions}
                      getOptionLabel={(option) => option.toString()}
                      renderInput={(params) => <TextField {...params} label="Series" fullWidth />}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  name="exercise"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      onChange={(event, value) => field.onChange(value)}
                      options={['100', '200', '300']}
                      renderInput={(params) => (
                        <TextField {...params} label="Actividad" fullWidth />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="intensity"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      onChange={(event, value) => field.onChange(value)}
                      options={Array.from({ length: 101 }, (_, index) => index)}
                      getOptionLabel={(option) => option.toString()}
                      renderInput={(params) => (
                        <TextField {...params} label="Intensidad" fullWidth />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton color="success" type="submit" disabled={!areAllFieldsFilled}>
                  <Iconify icon="material-symbols:check-circle" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
          <Box sx={{ p: 1, textAlign: 'right' }}>
            <Button size="small" color="inherit" startIcon={<Iconify icon="mdi:plus" />}>
              Save
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

NewTraining.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  exerciseTypes: PropTypes.array,
};

// ----------------------------------------------------------------------

function TrainingItem({ training }) {
  const { sets, reps, exercise, intensity, pb, type } = training;
  const suggested = pb * intensity;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={exercise}
        src={
          type !== 'series'
            ? `/assets/images/training/track.png`
            : `/assets/images/training/track.png`
        }
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {sets}x{reps}x{exercise}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          Intensidad: {intensity}% Ritmo: {suggested}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {type}
      </Typography>
    </Stack>
  );
}

TrainingItem.propTypes = {
  training: PropTypes.shape({
    sets: PropTypes.number,
    reps: PropTypes.number,
    exercise: PropTypes.string,
    intensity: PropTypes.number,
    pb: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
};
