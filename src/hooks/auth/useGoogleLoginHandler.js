import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../store/slices/authSlice';
import { googleLogin } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export const useGoogleLoginHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async (response) => {
    try {
      const responseData = await googleLogin(response.credential);

      dispatch(
        setCredentials({
          user: responseData.data,
        }),
      );

      toast.success('Google login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Google login failed');
    }
  };

  return handleGoogleLogin;
};
