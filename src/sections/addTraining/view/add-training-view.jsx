import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import LinearProgress from '@mui/material/LinearProgress';

// import { posts } from 'src/_mock/blog';

import { useState, useEffect } from 'react';
import { toDate, addDays, startOfWeek } from 'date-fns';

import SelectWeekStep from '../select-week-step';
import SelectTrainingDaysStep from '../select-training-days-step';
import { loadExerciseTypes } from '../../../database/trainingQueries';
import WeekTrainingSessionsStep from '../week-training-sessions-step';

// import PostCard from '../post-card';
// import PostSort from '../post-sort';

export default function AddTrainingView() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(toDate(addDays(startOfWeek(new Date()), 7)));
  const [schedule, setSchedule] = useState(() => [0, 1, 2, 3, 4, 5, 6]);
  const [activeStep, setActiveStep] = useState(0);
  const [exerciseTypes, setExerciseTypes] = useState(null);

  useEffect(() => {
    const getTypes = async () => {
      const types = await loadExerciseTypes();
      setExerciseTypes(types);
    };
    getTypes();
  }, []);

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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4">Add training</Typography>
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

              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Complete training sessions</StepLabel>
          <StepContent>
            {exerciseTypes ? (
              <WeekTrainingSessionsStep
                schedule={schedule}
                selectedDate={selectedDate}
                exerciseTypes={exerciseTypes}
              />
            ) : (
              <LinearProgress />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button variant="contained" color="success" onClick={handleUpload}>
                Upload
              </Button>
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
