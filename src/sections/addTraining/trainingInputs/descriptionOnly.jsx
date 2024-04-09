import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function DescriptionOnly({ control }) {
  return (
    <Grid item xs={9}>
      <Controller
        name="description"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            {...field}
            size="small"
            onChange={(event, value) => field.onChange(value)}
            options={Array.from({ length: 101 }, (_, index) => index)}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => <TextField {...params} label="Description" fullWidth />}
          />
        )}
      />
    </Grid>
  );
}

DescriptionOnly.propTypes = {
  control: PropTypes.any,
};
