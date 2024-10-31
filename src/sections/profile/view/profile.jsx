/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { useAuthStore } from 'src/store/authStore';
import { useUserStore } from 'src/store/userStore';
import { useExerciseStore } from 'src/store/dataStore';
import { loadExercises, loadPersonalBest } from 'src/database/trainingQueries';

import ProfileInfo from '../profile-info';
import ProfileSummary from '../profile-summary';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { personalBest, setPersonalBest } = useUserStore();
  const { exercises, setExercises } = useExerciseStore();

  useEffect(() => {
    const loadData = async () => {
      const loadedExercises = await loadExercises();
      setExercises(loadedExercises);
      const personalBests = await loadPersonalBest(user.id);
      const processedPersonalBests = await personalBests.map((pb) => {
        const matchedExercise = loadedExercises.find((e) => e.id === pb.exercise);
        return {
          id: matchedExercise.id,
          field: matchedExercise.name,
          info: pb.record,
          date: pb.date,
        };
      });
      console.log(processedPersonalBests);
      setPersonalBest(processedPersonalBests);
    };

    loadData();
  }, [setExercises, setPersonalBest, user.id]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4 }}>
        {t('profile')}
      </Typography>

      {user ? (
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <ProfileSummary title="Sarartanos" total={user.displayName} icon />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <ProfileSummary title="Joined" total={fDate(user.created_at)} />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <ProfileSummary title={t('logged-trainings')} total="0%" color="info" />
          </Grid>

          <Grid xs={12} md={6} lg={7}>
            <ProfileInfo
              type="edit_personal_info"
              title={t('personal-information')}
              data={[
                { field: t('name'), info: user.first_name },
                { field: t('surname'), info: user.last_name },
                { field: 'Main events', info: user.main_events },
                // { field: 'birthday', info: fDate(new Date('10-10-1996')) },
              ]}
            />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <ProfileInfo type="edit_personal_best" title={t('personal-best')} data={personalBest} />
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rectangular" />
      )}
    </Container>
  );
}
