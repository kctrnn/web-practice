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
import { Solution } from 'models';
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

export interface SolutionTableProps {
  list: Solution[];
  onEdit?: (solution: Solution) => void;
  onRemove?: (solution: Solution) => void;
}

function SolutionTable({ list, onEdit, onRemove }: SolutionTableProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution>();

  const handleRemoveClick = (solution: Solution) => {
    setSelectedSolution(solution);
    setOpen(true);
  };

  const handleRemoveConfirm = (solution: Solution) => {
    onRemove?.(solution);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>DemoUrl</TableCell>
              <TableCell>RepoUrl</TableCell>
              <TableCell>ChallengeId</TableCell>
              <TableCell>UserId</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((solution) => (
              <TableRow key={solution.id}>
                {/* <TableCell width={250}>{solution.id}</TableCell> */}
                <TableCell>
                  <Box fontWeight={500}>{solution.title}</Box>
                </TableCell>

                <TableCell>{solution.demoUrl}</TableCell>
                <TableCell>{solution.repoUrl}</TableCell>
                <TableCell>{solution.challengeId}</TableCell>
                <TableCell>{solution.userId}</TableCell>

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
                      onClick={() => onEdit?.(solution)}
                    >
                      Detail
                    </Button>

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveClick(solution)}
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
        <DialogTitle id="alert-dialog-slide-title">
          Remove a solution?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to remove solution named{' '}
            <strong>{selectedSolution?.title}</strong>
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
            onClick={() => handleRemoveConfirm(selectedSolution as Solution)}
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

export default SolutionTable;
