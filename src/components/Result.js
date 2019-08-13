import React from 'react';
import {
  Avatar,
  Button,
  Grid,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';

import DetailsModal from './DetailsModal';

export default function Result(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} sm={5} md={3}>
      <Paper>
        <Typography variant="h5" align="center">
          {props.login}
        </Typography>
        <Avatar src={props.avatar} className={props.bigAvatar} />
        <Button onClick={handleOpen}>
          Click me
        </Button>
        <Modal
          aria-labelledby="{props.login} details"
          open={open}
          onClose={handleClose}
        >
          <DetailsModal api={props.api} />
        </Modal>
      </Paper>
    </Grid>
  )
}
