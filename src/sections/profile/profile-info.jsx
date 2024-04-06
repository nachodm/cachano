import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import EditDialog from './edit-dialog';

export default function ProfileInfo({ type, title, data }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader title={title} sx={{ mb: 2 }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {data.map((item, i) => (
            <Item key={`field-${i}`} field={item.field} info={item.info} date={item.date} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          onClick={handleClick}
        >
          Editar
        </Button>
      </Box>
      <EditDialog type={type} open={open} handleClose={handleClose} data={data} />
    </Card>
  );
}

ProfileInfo.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      info: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};

function Item(props) {
  const { field, info, date } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography color="inherit" variant="subtitle2" underline="hover" noWrap>
          {field}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {info}
        </Typography>
      </Box>

      {date && (
        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
          {date}
        </Typography>
      )}
    </Stack>
  );
}

Item.propTypes = {
  field: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  date: PropTypes.string,
};
