import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginForm from 'features/auth/components/LoginForm';
import React from 'react';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginForm />
    </ThemeProvider>
  );
}

export default App;
