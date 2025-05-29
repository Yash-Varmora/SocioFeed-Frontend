import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <ForgotPasswordForm onSuccess={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default ForgotPassword;
