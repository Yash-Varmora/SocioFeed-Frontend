import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <LoginForm onSuccess={() => handleSuccess} />
        <p className="mt-4 text-center">
          Forgot password?{' '}
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Reset here
          </Link>
        </p>
        <p className="mt-2 text-center">
          Don&#39;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
