import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

import Stack from '@mui/material/Stack';

import NewTraining from './newTraining';

// ----------------------------------------------------------------------

export default function WeekTrainingSessionsStep(props) {
  const { schedule } = props;

  return (
    <Stack direction="column" alignItems="center" justifyContent="space-between">
      {schedule.map((day, i) => (
        <NewTraining
          key={`training-${i}`}
          title={format(day, 'EEEE dd')}
          list={[...Array(3)].map((_, index) => ({
            id: faker.string.uuid(),
            title: ['8x150m', '2x400', '4x80', '2x150'][Math.floor(Math.random() * 4)],
            description: 'Intensidad: 75% (Ritmo: 20.1s)',
            image: `/assets/images/training/track.png`,
            type: 'Series',
          }))}
        />
      ))}
    </Stack>
  );
}

WeekTrainingSessionsStep.propTypes = {
  schedule: PropTypes.any,
};
