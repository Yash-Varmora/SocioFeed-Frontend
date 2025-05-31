import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { logout } from '../store/slices/authSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      Cookies.remove('isLoggedIn');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  return handleLogout;
};

export default useLogout;
