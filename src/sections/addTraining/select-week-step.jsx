import PropTypes from 'prop-types';
import { startOfWeek } from 'date-fns';

import Stack from '@mui/material/Stack';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import CustomDayPicker from '../calendar/customDayPicker';

// ----------------------------------------------------------------------

export default function SelectWeekStep(props) {
  const { selectedDate, setSelectedDate, hoveredDay, setHoveredDay } = props;

  return (
    <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(startOfWeek(newValue, { weekStartsOn: 1 }))}
        showDaysOutsideCurrentMonth
        slots={{ day: CustomDayPicker }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: selectedDate,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
        }}
      />
    </Stack>
  );
}

SelectWeekStep.propTypes = {
  selectedDate: PropTypes.any,
  setSelectedDate: PropTypes.any,
  hoveredDay: PropTypes.any,
  setHoveredDay: PropTypes.any,
};
