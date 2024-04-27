import { faker } from '@faker-js/faker';
import { lazy, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { supabase } from 'src/utils/supabase';

import { useAuthStore } from 'src/store/authStore';
import { useTrainingGroupStore } from 'src/store/trainingGroupStore';

import AppTraining from '../app-training';

const NewUserForm = lazy(() => import('../new-user-form'));

// ----------------------------------------------------------------------

export default function AppView() {
  const { loadWeekTrainingSessions } = useTrainingGroupStore();
  const { user } = useAuthStore();
  const [todaySession, setTodaySession] = useState(null);
  const [open, setOpen] = useState(user.showNewUserForm || false);

  useEffect(() => {
    const getSessions = async () => {
      await loadWeekTrainingSessions(new Date());
      setTodaySession(null);
    };
    if (user.group_affiliation) getSessions();
  }, [loadWeekTrainingSessions, user.group_affiliation]);

  const loadNewUserInfo = async (form) => {
    const today = new Date().toISOString();
    try {
      const profilePromise = supabase
        .from('profiles')
        .update({
          first_name: form.name,
          last_name: form.surname,
          main_events: form['main-events'],
          showNewUserForm: false,
        })
        .eq('id', user.id);

      const personalBestPromise = supabase.from('personal_best').upsert([
        {
          record: form['60m'],
          exercise: 4,
          user_id: user.id,
          date: today,
        },
        {
          record: form['100m'],
          exercise: 6,
          user_id: user.id,
          date: today,
        },
        {
          record: form['200m'],
          exercise: 10,
          user_id: user.id,
          date: today,
        },
      ]);

      const [profileResult, personalBestResult] = await Promise.all([
        profilePromise,
        personalBestPromise,
      ]);

      if (profileResult.error) {
        console.error('Error al insertar el perfil:', profileResult.error.message);
      } else {
        console.log('Perfil insertado correctamente:', profileResult.data);
      }

      if (personalBestResult.error) {
        console.error(
          'Error al insertar los registros personales:',
          personalBestResult.error.message
        );
      } else {
        console.log('Registros personales insertados correctamente:', personalBestResult.data);
      }
    } catch (error) {
      console.error('Error al cargar la nueva información del usuario:', error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Hola, Sarartano 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12}>
          {todaySession ? (
            <AppTraining
              title="Entrenamiento"
              list={[...Array(3)].map((_, index) => ({
                id: faker.string.uuid(),
                title: ['8x150m', '2x400', '4x80', '2x150'][Math.floor(Math.random() * 4)],
                description: 'Intensidad: 75% (Ritmo: 20.1s)',
                image: `/assets/images/training/track.png`,
                type: 'Series',
              }))}
            />
          ) : (
            <Card>
              <CardHeader
                title={
                  user.group_affiliation
                    ? 'Rest day!'
                    : "You're not part of any training group at the moment"
                }
                subheader={
                  user.group_affiliation
                    ? 'Enjoy your day off'
                    : 'Daily trainings will appear here as soon as you become member of a training group. Please ask your manager to send you an invite'
                }
              />
              <CardContent />
            </Card>
          )}
        </Grid>
        {/* <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Logins hoy"
            total={7}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Atletas"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Reports totales"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
        {user && (
          <NewUserForm open={open} onClose={() => setOpen(false)} onSubmit={loadNewUserInfo} />
        )}
      </Grid>
    </Container>
  );
}
