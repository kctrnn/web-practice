import { Box, Chip, makeStyles, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import studentApi from "api/studentApi";
import { Student } from "models";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../components/StudentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },

  titleBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(4),

    textDecoration: "none",
    color: theme.palette.primary.dark,
  },

  form: {
    marginTop: theme.spacing(2),
    maxWidth: "500px",
  },

  studentId: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),

    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
}));

function AddEditPage() {
  const classes = useStyles();
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const response = await studentApi.get(studentId);
        setStudent(response);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(student?.id || "", formValues);
    } else {
      await studentApi.add(formValues);
    }

    // Show toast success
    toast.success("🚀 Save student successfully");

    // Redirect to student main page
    history.push("/admin/students");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography variant='h5'>
          {isEdit ? "Update student info" : "Add new student"}
        </Typography>

        <Typography
          variant='subtitle2'
          component={Link}
          to='/admin/students'
          className={classes.back}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Box>

      {student && (
        <Box className={classes.studentId}>
          <Chip label='Student ID' size='small' />
          <Typography variant='body2'>{student.id}</Typography>
        </Box>
      )}

      {(student || !isEdit) && (
        <Box className={classes.form}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}

export default AddEditPage;
