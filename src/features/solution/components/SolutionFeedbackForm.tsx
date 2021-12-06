import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { InputField } from 'components/FormFields';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface SolutionFeedbackFormProps {
  onSubmit?: (formValues: { message: string }) => void;
}

const schema = yup.object().shape({
  message: yup.string().required('Please enter your message'),
});

function SolutionFeedbackForm({ onSubmit }: SolutionFeedbackFormProps) {
  const { control, handleSubmit } = useForm<{ message: string }>({
    defaultValues: { message: '' },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: { message: string }) => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        name="message"
        control={control}
        label="Message"
        placeholder="Type something"
        variant="outlined"
        autoFocus
      />

      <Box textAlign="right" mt={1}>
        <Button
          type="submit"
          variant="contained"
          size="small"
          disableElevation
          sx={{ fontSize: '.75rem' }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default SolutionFeedbackForm;
