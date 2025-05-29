import React from 'react';
import { toast } from 'react-toastify';
import Form from './Form';
import { registerSchema } from '../../schemas/authSchemas';
import { registerUser } from '../../services/authService';
import { useGoogleLoginHandler } from '../../hooks/useGoogleLoginHandler';
import { GoogleLogin } from '@react-oauth/google';

const RegisterForm = ({ onSuccess }) => {
  const handleGoogleLogin = useGoogleLoginHandler(onSuccess);

  const handleRegister = async (data) => {
    try {
      await registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      toast.success('Registration successful! Check your email to activate.');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  const fields = [
    { label: 'Email', name: 'email' },
    { label: 'Username', name: 'username' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
  ];

  return (
    <Form
      schema={registerSchema}
      fields={fields}
      onSubmit={handleRegister}
      submitLabel="Register"
      additionalButtons={
        <>
          <GoogleLogin
            key="google"
            onSuccess={handleGoogleLogin}
            onError={() => toast.error('Google registration failed')}
            text="signup_with"
            shape="rectangular"
          />
        </>
      }
    />
  );
};

export default RegisterForm;
