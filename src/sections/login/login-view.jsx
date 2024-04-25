import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { supabase } from 'src/utils/supabase';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Logo />
            <Typography variant="h4">Welcome to MRNXN</Typography>
          </Stack>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'blue',
                    brandAccent: 'darkBlue',
                  },
                },
              },
            }}
            providers={['google']}
          />
        </Card>
      </Stack>
    </Box>
  );
}
