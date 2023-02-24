import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { City, Student } from 'models';
import { forwardRef, ReactElement, Ref, useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

const useStyles = makeStyles((theme) => ({
  table: {},
  editBtn: {
    marginRight: theme.spacing(1),
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };

  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell width={320}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight='bold'>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align='right'>
                  <Button
                    size='small'
                    color='primary'
                    className={classes.editBtn}
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size='small'
                    color='secondary'
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
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
        onClose={handleClose}
      >
        <DialogTitle id='alert-dialog-slide-title'>
          Remove a student?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure to remove student named{' '}
            <strong>{selectedStudent?.name}</strong>
            <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            color='default'
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color='secondary'
            variant='contained'
            size='small'
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StudentTable;
