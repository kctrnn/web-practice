import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginPage from 'features/auth/pages/LoginPage';
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
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
