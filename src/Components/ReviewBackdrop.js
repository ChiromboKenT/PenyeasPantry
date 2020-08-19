import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function ReviewBackdrop({openState}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={openState} >
        <CircularProgress size="15rem" thickness={4.2} color="secondary" />
      </Backdrop>
    </div>
  );
}
