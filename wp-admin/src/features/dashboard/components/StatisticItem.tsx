import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ReactElement } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(3),
  },
}));

export interface StatisticItemProps {
  icon: ReactElement;
  label: string;
  value: number;
}

const StatisticItem = ({ icon, label, value }: StatisticItemProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>

      <Box>
        <Typography variant='h6' align='right'>
          {value}
        </Typography>

        <Typography variant='body2'>{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;
