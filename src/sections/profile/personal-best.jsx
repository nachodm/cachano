import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
// ----------------------------------------------------------------------

const list = [
  { event: '60m', pb: '7.12', date: fDate(new Date()) },
  { event: '100m', pb: '11.01', date: fDate(new Date()) },
  { event: '150m', pb: '16.80', date: fDate(new Date()) },
  { event: '200m', pb: '22.18', date: fDate(new Date()) },
  { event: '300m', pb: '36.5', date: fDate(new Date()) },
];

export default function ProfileInfo({ title }) {
  return (
    <Card>
      <CardHeader title={title} sx={{ mb: 2 }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((i) => (
            <Item key={i.id} event={i.event} pb={i.pb} date={i.date} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Editar
        </Button>
      </Box>
    </Card>
  );
}

ProfileInfo.propTypes = {
  title: PropTypes.string,
};

function Item(props) {
  const { event, pb, date } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography color="inherit" variant="subtitle2" underline="hover" noWrap>
          {event}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {pb}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {date}
      </Typography>
    </Stack>
  );
}

Item.propTypes = {
  event: PropTypes.string,
  pb: PropTypes.string,
  date: PropTypes.string,
};
