import { useState } from 'react';
import { toDate, getDay, isSameWeek } from 'date-fns';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { posts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(getDay(day) === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(getDay(day) === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

function Day(props) {
  // eslint-disable-next-line react/prop-types
  const { day, selectedDay, hoveredDay, ...other } = props;
  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isSameWeek(day, selectedDay)}
      isHovered={isSameWeek(day, hoveredDay)}
    />
  );
}

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
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) => ({
              selectedDay: value,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            }),
          }}
        />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
