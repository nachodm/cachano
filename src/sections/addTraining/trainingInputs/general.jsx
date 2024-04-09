import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function General({ control, setAndRepsOptions }) {
  return (
    <Fragment>
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
              renderInput={(params) => <TextField {...params} label="Actividad" fullWidth />}
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
              renderInput={(params) => <TextField {...params} label="Intensidad" fullWidth />}
            />
          )}
        />
      </Grid>
    </Fragment>
  );
}

General.propTypes = {
  control: PropTypes.any,
  setAndRepsOptions: PropTypes.array,
};
