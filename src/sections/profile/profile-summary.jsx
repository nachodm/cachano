import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useAuthStore } from 'src/store/authStore';

// ----------------------------------------------------------------------

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ProfileSummary({ title, total, icon = false }) {
  const { user } = useAuthStore();

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 4,
        borderRadius: 2,
      }}
    >
      {icon && user ? <Avatar {...stringAvatar(user.displayName)} /> : <Skeleton />}

      <Stack spacing={0.5}>
        <Typography variant="h4">{total}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }} noWrap>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

ProfileSummary.propTypes = {
  icon: PropTypes.bool,
  title: PropTypes.string,
  total: PropTypes.string,
};
