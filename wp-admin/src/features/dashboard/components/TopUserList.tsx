import { Box, Typography } from '@material-ui/core';
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
import { UserWithSolution } from '../dashboardSlice';

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

export interface TopUserListProps {
  title: string;
  userList: UserWithSolution[];
}

function TopUserList({ title, userList }: TopUserListProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="button">{title}</Typography>

      <TableContainer className={classes.tableBox}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Total solution</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userList.map((user) => (
              <StyledTableRow key={user.user.id}>
                <TableCell component="th" scope="row">
                  {user.user.id}
                </TableCell>
                <TableCell>{user.user.name}</TableCell>
                <TableCell>{user.user.username}</TableCell>
                <TableCell>{user.totalSolution}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TopUserList;
