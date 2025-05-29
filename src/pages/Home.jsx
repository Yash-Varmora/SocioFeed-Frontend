import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { logoutUser } from '../services/authService';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      Cookies.remove('isLoggedIn');
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    }
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">SocioFeed</h1>
      {user ? (
        <>
          <p className="mt-2">Welcome, {user.username}!</p>
          <Button variant="contained" color="secondary" className="mt-4" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Home;
