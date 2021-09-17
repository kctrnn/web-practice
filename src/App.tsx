import { Box } from '@mui/system';
import { InputField, PasswordField } from 'components/FormFields';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 12,
  },
});

function App() {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '400px', m: '0 auto' }}>
        <InputField
          name='email'
          control={control}
          type='email'
          label='Email Address'
        />
        <PasswordField name='password' control={control} label='Password' />
      </Box>
    </ThemeProvider>
  );
}

export default App;
