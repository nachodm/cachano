import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import EditDialog from './edit-dialog';

export default function ProfileInfo({ type, title, data }) {
  const [open, setOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);

  const handleClick = (item) => {
    setItemClicked(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader title={title} sx={{ mb: 1 }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ py: 2, px: 3 }} direction="column">
          {data.map((item, i) => (
            <Box key={`field-${i}`} display="flex" justifyContent="space-between">
              <Item field={item.field} info={item.info} date={item.date} />
              <IconButton onClick={handleClick(item)}>
                <Iconify icon="mdi:edit" />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Scrollbar>
      <EditDialog type={type} open={open} handleClose={handleClose} item={itemClicked} />
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
    <Stack direction="row" alignItems="center" spacing={2} flex={1}>
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
