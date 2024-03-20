/* eslint-disable react/prop-types */

import { getDay, isSameWeek } from 'date-fns';

import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

// ----------------------------------------------------------------------

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
  ...(getDay(day) === 1 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(getDay(day) === 0 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

export default function CustomDayPicker(props) {
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
