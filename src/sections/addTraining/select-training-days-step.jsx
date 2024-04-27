import PropTypes from 'prop-types';
import { format, addDays } from 'date-fns';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ----------------------------------------------------------------------

export default function SelectTrainingDaysStep(props) {
  const { schedule, selectedDate, setSchedule } = props;
  const week = [];
  new Array(7).fill().map((_, i) => week.push(format(addDays(selectedDate, i), 'EEEEEE dd')));

  const handleChange = (_, newSchedule) => {
    if (newSchedule.length > 0) {
      setSchedule(newSchedule);
    } else {
      <Alert severity="warning">At least one day should be selected.</Alert>;
    }
  };

  return (
    <Stack mb={4} direction="row" alignItems="center" justifyContent="space-between">
      <ToggleButtonGroup color="primary" value={schedule} onChange={handleChange} aria-label="Week">
        {week.map((day, i) => (
          <ToggleButton value={i} key={`option-${i}`}>
            {day}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}

SelectTrainingDaysStep.propTypes = {
  schedule: PropTypes.array.isRequired,
  selectedDate: PropTypes.any,
  setSchedule: PropTypes.any,
};
