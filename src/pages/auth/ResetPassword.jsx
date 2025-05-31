import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get('redirect') || '/';

  const handleSuccess = () => {
    navigate(redirect, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {token ? (
          <ResetPasswordForm token={token} onSuccess={handleSuccess} />
        ) : (
          <p className="text-red-500 text-center">Invalid reset link</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
