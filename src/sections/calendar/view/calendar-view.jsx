import { useState } from 'react';
import { toDate } from 'date-fns';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import Iconify from 'src/components/iconify';

import CustomDayPicker from '../customDayPicker';

export default function CalendarView() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(toDate(new Date()));

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Calendar</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add week
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          showDaysOutsideCurrentMonth
          displayWeekNumber
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
        {/* {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))} */}
      </Grid>
    </Container>
  );
}
