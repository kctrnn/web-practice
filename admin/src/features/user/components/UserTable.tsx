import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TransitionProps } from '@material-ui/core/transitions';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { User } from 'models';
import { forwardRef, ReactElement, Ref, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  table: {},
  editBtn: {
    marginRight: theme.spacing(1),
    textTransform: 'capitalize',
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface UserTableProps {
  list: User[];
  onEdit?: (user: User) => void;
  onRemove?: (user: User) => void;
}

function UserTable({ list, onEdit, onRemove }: UserTableProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleRemoveClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleRemoveConfirm = (user: User) => {
    onRemove?.(user);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((user) => (
              <TableRow key={user.id}>
                <TableCell width={250}>{user.id}</TableCell>
                <TableCell>
                  <Box fontWeight={500}>{user.name}</Box>
                </TableCell>

                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.bio || 'empty'}</TableCell>

                <TableCell align="right">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Button
                      size="small"
                      color="primary"
                      className={classes.editBtn}
                      onClick={() => onEdit?.(user)}
                    >
                      Detail
                    </Button>

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveClick(user)}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="alert-dialog-slide-title">Remove a user?</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to remove user named{' '}
            <strong>{selectedUser?.name}</strong>
            <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="default"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedUser as User)}
            color="secondary"
            variant="contained"
            size="small"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserTable;
