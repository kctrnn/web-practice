import { yupResolver } from '@hookform/resolvers/yup';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Button, Paper } from '@mui/material';
import { Box, styled } from '@mui/system';
import { MarkdownViewer } from 'components/Common';
import { InputField } from 'components/FormFields';
import { Solution } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const PreviewDesc = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  borderColor: theme.palette.primary.dark,
  minHeight: 120,
}));

const schema = yup.object().shape({
  title: yup.string().required('Missing title'),
  description: yup.string().required('Missing description'),
  demoUrl: yup
    .string()
    .required('Missing demo URL')
    .url('Please enter a valid URL'),
  repoUrl: yup
    .string()
    .required('Missing repo URL')
    .url('Please enter a valid URL'),
  feedbackRequest: yup.string().required('Missing feedback request'),
});

export interface SubmitFormProps {
  onInputClick: (name: string) => void;
  onSubmit?: (formValues: Partial<Solution>) => void;
}

function SubmitForm({ onSubmit, onInputClick }: SubmitFormProps) {
  const [previewMode, setPreviewMode] = useState(false);

  const { control, handleSubmit, getValues } = useForm<Partial<Solution>>({
    defaultValues: {
      title: '',
      description: '',
      demoUrl: '',
      repoUrl: '',
      feedbackRequest: 'I would love to hear your feedback',
    },

    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: Partial<Solution>) => {
    if (!onSubmit) return;

    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        variant="outlined"
        control={control}
        name="title"
        label="Title"
        autoFocus
        onClick={() => onInputClick('title')}
      />

      {!previewMode && (
        <InputField
          variant="outlined"
          control={control}
          name="description"
          label="Description"
          rows={4}
          onClick={() => onInputClick('description')}
        />
      )}

      {previewMode && (
        <PreviewDesc variant="outlined">
          <MarkdownViewer
            content={
              getValues('description') ||
              '*You got no description yet. Start adding some?*'
            }
          />
        </PreviewDesc>
      )}

      <Box textAlign="right" mb={1}>
        <Button
          size="small"
          variant="contained"
          color="warning"
          disableElevation
          sx={{ textTransform: 'capitalize', fontWeight: 400 }}
          onClick={() => setPreviewMode((x) => !x)}
        >
          {previewMode ? 'Edit' : 'Preview'}
        </Button>
      </Box>

      <InputField
        variant="outlined"
        control={control}
        name="demoUrl"
        label="Demo URL"
        onClick={() => onInputClick('demoUrl')}
      />

      <InputField
        variant="outlined"
        control={control}
        name="repoUrl"
        label="Repo URL"
        onClick={() => onInputClick('repoUrl')}
      />

      <InputField
        variant="outlined"
        control={control}
        name="feedbackRequest"
        label="Feedback Request"
        onClick={() => onInputClick('feedbackRequest')}
      />

      <Box textAlign="right" mt={2}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveRoundedIcon />}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default SubmitForm;
