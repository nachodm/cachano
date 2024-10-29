import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { createNumberArray } from 'src/utils/format-arrays';

// ----------------------------------------------------------------------

export default function General({ control }) {
  return (
    <Fragment>
      <Grid item xs={4} lg={2}>
        <Controller
          name="sets"
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
              options={createNumberArray(15)}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Bloques" fullWidth />}
            />
          )}
        />
      </Grid>

      <Grid item xs={4} lg={2}>
        <Controller
          name="reps"
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
              options={createNumberArray(15)}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Series" fullWidth />}
            />
          )}
        />
      </Grid>

      <Grid item xs={6} lg={2}>
        <Controller
          name="exercise"
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
              options={['100', '200', '300']}
              renderInput={(params) => <TextField {...params} label="Actividad" fullWidth />}
            />
          )}
        />
      </Grid>
      <Grid item xs={5} lg={2}>
        <Controller
          name="intensity"
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
              options={createNumberArray(100)}
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
};
