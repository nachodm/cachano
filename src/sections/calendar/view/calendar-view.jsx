import esLocale from 'date-fns/locale/es';
import { useState, useCallback } from 'react';
import { toDate, format, addDays, startOfWeek } from 'date-fns';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import Training from '../training';
import CustomDayPicker from '../customDayPicker';

export default function CalendarView() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(toDate(new Date()));

  const handleDateChange = useCallback(
    (newValue) => setValue(startOfWeek(newValue, { weekStartsOn: 1 })),
    []
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4">Calendar</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          component={RouterLink}
          to="/add-training"
        >
          Add week
        </Button>
      </Stack>

      <Stack mb={4} direction="row" alignItems="center" justifyContent="space-between">
        <DateCalendar
          value={value}
          onChange={handleDateChange}
          showDaysOutsideCurrentMonth
          slots={{ day: CustomDayPicker }}
          slotProps={{
            day: (ownerState) => ({
              selectedDay: value,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            }),
          }}
        />
      </Stack>

      <Grid container spacing={3}>
        {[...Array(7)].map((_, index) => (
          <Grid xs={12} key={`training-${index}`}>
            <Training
              title={`Entrenamiento ${format(addDays(value, index), "EEEE, d 'de' MMMM", { locale: esLocale })}`}
              list={[...Array(3)].map((exercise, i) => ({
                id: `exercise-${i}`,
                title: ['8x150m', '2x400', '4x80', '2x150'][Math.floor(Math.random() * 4)],
                description: 'Intensidad: 75% (Ritmo: 20.1s)',
                image: `/assets/images/training/track.png`,
                type: 'Series',
              }))}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
