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
            freeSolo
            {...field}
            size="small"
            onChange={(event, value) => field.onChange(value)}
            onInputChange={(_, data) => {
              if (data) field.onChange(data);
            }}
            options={["5'", "10'", "15'", '3 vueltas', '4 vueltas']}
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
