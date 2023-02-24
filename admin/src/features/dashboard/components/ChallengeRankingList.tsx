import { Box, LinearProgress, Typography } from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Challenge } from 'models';

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },

  tableBox: {
    marginTop: theme.spacing(2),
  },
}));

export interface ChallengeRankingListProps {
  title: string;
  challengeList: Challenge[];
}

function ChallengeRankingList({
  title,
  challengeList,
}: ChallengeRankingListProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="button">{title}</Typography>

      <TableContainer className={classes.tableBox}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {challengeList.map((challenge, index) => (
              <StyledTableRow key={challenge.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{challenge.name}</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={(100 / 6) * (challenge.level + 1)}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ChallengeRankingList;
