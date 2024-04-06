import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { useAuthStore } from 'src/store/authStore';

import ProfileInfo from '../profile-info';
import ProfileSummary from '../profile-summary';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const { user } = useAuthStore();
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Perfil
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
            <ProfileSummary title="Entrenamientos registrados" total="90%" color="info" />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <ProfileInfo
              type="edit_personal_info"
              title="Personal information"
              data={[
                { field: 'Name', info: user.first_name },
                { field: 'Surname', info: user.last_name },
                { field: 'Main events', info: user.main_events },
                { field: 'birthday', info: fDate(new Date('10-10-1996')) },
                { field: 'Gender', info: 'Male' },
              ]}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <ProfileInfo
              type="edit_personal_best"
              title="Personal best"
              data={[
                { field: '60m', info: '7.12', date: fDate(new Date()) },
                { field: '100m', info: '11.01', date: fDate(new Date()) },
                { field: '150m', info: '16.80', date: fDate(new Date()) },
                { field: '200m', info: '22.18', date: fDate(new Date()) },
                { field: '300m', info: '36.5', date: fDate(new Date()) },
              ]}
            />
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rectangular" />
      )}
    </Container>
  );
}
