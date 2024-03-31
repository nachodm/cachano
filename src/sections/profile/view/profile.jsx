import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import ProfileInfo from '../profile-info';
import ProfileSummary from '../profile-summary';

// ----------------------------------------------------------------------

export default function ProfileView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Perfil
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <ProfileSummary title="Sarartanos" total="Nacho Domingo" icon />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <ProfileSummary title="Joined" total={fDate(new Date('01-10-2017'))} />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <ProfileSummary title="Entrenamientos registrados" total="90%" color="info" />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <ProfileInfo
            title="Personal information"
            data={[
              { field: 'Name', info: 'Nacho' },
              { field: 'Surname', info: 'Domingo' },
              { field: 'Main events', info: '60m, 100m, 200m' },
              { field: 'birthday', info: fDate(new Date('10-10-1996')) },
              { field: 'Gender', info: 'Male' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <ProfileInfo
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
    </Container>
  );
}
