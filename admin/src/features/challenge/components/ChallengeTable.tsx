import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
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
import { Challenge } from 'models';
import { forwardRef, ReactElement, Ref, useState } from 'react';
import { getPathSlugColor } from 'utils';

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

export interface ChallengeTableProps {
  list: Challenge[];
  onEdit?: (challenge: Challenge) => void;
  onRemove?: (challenge: Challenge) => void;
}

function ChallengeTable({ list, onEdit, onRemove }: ChallengeTableProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>();

  const handleRemoveClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setOpen(true);
  };

  const handleRemoveConfirm = (challenge: Challenge) => {
    onRemove?.(challenge);
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
              <TableCell>Description</TableCell>
              <TableCell>PathSlug</TableCell>
              <TableCell>Level</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((challenge) => (
              <TableRow key={challenge.id}>
                <TableCell width={250}>{challenge.id}</TableCell>
                <TableCell>
                  <Box fontWeight={500}>{challenge.name}</Box>
                </TableCell>

                <TableCell>
                  <Box
                    width={200}
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {challenge.description}
                  </Box>
                </TableCell>

                <TableCell>
                  <Box color={getPathSlugColor(challenge.pathSlug)}>
                    {challenge.pathSlug}
                  </Box>
                </TableCell>

                <TableCell width={100}>
                  <LinearProgress
                    variant="determinate"
                    value={(100 / 6) * (challenge.level + 1)}
                  />
                </TableCell>

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
                      onClick={() => onEdit?.(challenge)}
                    >
                      Detail
                    </Button>

                    <IconButton
                      size="small"
                      onClick={() => handleRemoveClick(challenge)}
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
          Remove a challenge?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to remove challenge named{' '}
            <strong>{selectedChallenge?.name}</strong>
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
            onClick={() => handleRemoveConfirm(selectedChallenge as Challenge)}
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

export default ChallengeTable;
