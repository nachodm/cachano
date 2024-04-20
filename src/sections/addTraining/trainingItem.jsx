import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TrainingItem({ training }) {
  const { sets, reps, exercise, intensity, pb, type, description, hurdles, jumps } = training;
  const [body, setBody] = useState({ title: null, secondaryTitle: null, picture: 'track.png' });
  const recommended = Number.isNaN(pb * intensity) ? '-' : pb * intensity;

  useEffect(() => {
    switch (type) {
      case 'Calentamiento':
        setBody({ title: type, secondaryTitle: description, picture: 'warmup.png' });
        break;
      case 'Pirámide':
        setBody({
          picture: 'track.png',
        });
        break;
      case 'Pliometría':
        setBody({
          title: `${reps}x${hurdles} vallas a ${jumps} rebotes`,
          secondaryTitle: description,
          picture: 'hurdles.png',
        });
        break;
      case 'Gym':
        setBody({
          title: `${exercise}`,
          secondaryTitle: `${sets}x${reps}. Intensidad: ${intensity}%. Peso:${recommended}kg`,
          picture: 'gym.png',
        });
        break;
      default:
        setBody({
          title: sets === 1 ? `${reps}x${exercise}` : `${sets}x${reps}x${exercise}`,
          secondaryTitle: `Intensidad: ${intensity}%. Ritmo:${recommended}`,
          picture: 'track.png',
        });
        break;
    }
  }, [
    body,
    description,
    exercise,
    hurdles,
    intensity,
    jumps,
    reps,
    sets,
    type,
    setBody,
    recommended,
  ]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={exercise}
        src={`/assets/images/training/${body.picture}`}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {body.title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {body.secondaryTitle}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {type}
      </Typography>
    </Stack>
  );
}

TrainingItem.propTypes = {
  training: PropTypes.shape({
    sets: PropTypes.number,
    reps: PropTypes.number,
    exercise: PropTypes.string,
    intensity: PropTypes.number,
    pb: PropTypes.number,
    hurdles: PropTypes.number,
    jumps: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
};
