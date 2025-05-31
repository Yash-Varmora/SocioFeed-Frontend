import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Toast from './components/common/Toast';
import useAuthCheck from './hooks/useAuthCheck';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const { isLoading } = useAuthCheck();
  const { user } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Toast />
      <Box sx={{ display: 'flex' }}>
        {user && <Sidebar />}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, transition: 'margin 0.3s ease-in-out' }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
