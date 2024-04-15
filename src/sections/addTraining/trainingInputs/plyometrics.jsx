import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { createNumberArray } from 'src/utils/format-arrays';

// ----------------------------------------------------------------------

export default function Plyometrics({ control }) {
  return (
    <Fragment>
      <Grid item xs={2}>
        <Controller
          name="hurdles"
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
              renderInput={(params) => <TextField {...params} label="Vallas" fullWidth />}
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
              onInputChange={(_, data) => {
                if (data) field.onChange(data);
              }}
              options={createNumberArray(15)}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Pasadas" fullWidth />}
            />
          )}
        />
      </Grid>

      <Grid item xs={2}>
        <Controller
          name="jumps"
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
              options={createNumberArray(5)}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Apoyos" fullWidth />}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name="Description"
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
              options={['3 bloques subiendo altura']}
              renderInput={(params) => <TextField {...params} label="Description" fullWidth />}
            />
          )}
        />
      </Grid>
    </Fragment>
  );
}

Plyometrics.propTypes = {
  control: PropTypes.any,
};
