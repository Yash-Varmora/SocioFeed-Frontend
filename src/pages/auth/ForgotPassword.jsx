import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get('redirect') || '/login';

  const handleSuccess = () => {
    navigate(redirect, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <ForgotPasswordForm onSuccess={() => handleSuccess} />
      </div>
    </div>
  );
};

export default ForgotPassword;
