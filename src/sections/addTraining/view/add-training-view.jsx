import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';

// import { posts } from 'src/_mock/blog';

import { useState } from 'react';
import { toDate, addDays, startOfWeek } from 'date-fns';

import Iconify from 'src/components/iconify';

import SelectWeekStep from '../select-week-step';
import SelectTrainingDaysStep from '../select-training-days-step';
import WeekTrainingSessionsStep from '../week-training-sessions-step';

// import PostCard from '../post-card';
// import PostSort from '../post-sort';

export default function AddTrainingView() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(toDate(addDays(startOfWeek(new Date()), 7)));
  const [schedule, setSchedule] = useState(() => [0, 1, 2, 3, 4, 5, 6]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Select week', 'Choose training days', 'Complete training sessions'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpload = () => {
    setActiveStep(0);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Add training</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add week
        </Button>
      </Stack>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Select week</StepLabel>
          <StepContent>
            <SelectWeekStep
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              hoveredDay={hoveredDay}
              setHoveredDay={setHoveredDay}
            />
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                Next
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Choose a weekly schedule</StepLabel>
          <StepContent>
            <SelectTrainingDaysStep
              schedule={schedule}
              selectedDate={selectedDate}
              setSchedule={setSchedule}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Complete training sessions</StepLabel>
          <StepContent>
            <WeekTrainingSessionsStep schedule={schedule} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleUpload}>Upload</Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>

      {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
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
      </Grid> */}
    </Container>
  );
}
