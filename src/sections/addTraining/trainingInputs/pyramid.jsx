import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function Pyramid({ control, series }) {
  console.log(series);
  return (
    <Fragment>
      <Grid item xs={3}>
        <Controller
          name="series"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              freeSolo
              size="small"
              onChange={(event, value) =>
                field.onChange(value ? [...field.value, value] : [field.value])
              }
              options={series}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Series" fullWidth />}
            />
          )}
        />
      </Grid>

      <Grid item xs={3}>
        <Controller
          name="recovery"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              {...field}
              size="small"
              multiple
              freeSolo
              onChange={(event, value) => field.onChange([field.value])}
              options={[...Array(21).keys()]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Recuperaciones" fullWidth />}
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
              onChange={field.onChange}
              options={[...Array(101).keys()]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => <TextField {...params} label="Intensidad" fullWidth />}
            />
          )}
        />
      </Grid>
    </Fragment>
  );
}

Pyramid.propTypes = {
  control: PropTypes.any,
  series: PropTypes.array,
};
