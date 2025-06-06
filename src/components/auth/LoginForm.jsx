import React from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import Form from './Form';
import { loginSchema } from '../../schemas/authSchemas';
import { useGoogleLoginHandler } from '../../hooks/auth/useGoogleLoginHandler';
import { GoogleLogin } from '@react-oauth/google';
import { loginUser } from '../../services/authService';

const LoginForm = ({ onSuccess }) => {
  const handleGoogleLogin = useGoogleLoginHandler(onSuccess);

  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data);
      dispatch(setCredentials({ user: response.data }));
      toast.success('Login successful!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  const fields = [
    { label: 'Email or Username', name: 'emailOrUsername' },
    { label: 'Password', name: 'password', type: 'password' },
  ];
  return (
    <Form
      schema={loginSchema}
      fields={fields}
      onSubmit={handleLogin}
      submitLabel="Login"
      additionalButtons={
        <>
          <GoogleLogin
            key="google"
            onSuccess={handleGoogleLogin}
            onError={() => toast.error('Google login failed')}
            text="signin_with"
            shape="rectangular"
          />
        </>
      }
    />
  );
};

export default LoginForm;
