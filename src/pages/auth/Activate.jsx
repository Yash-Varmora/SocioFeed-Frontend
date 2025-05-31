import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';

const Activate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await api.post('/auth/activate', { token });
        toast.success('Account activated! Please login.');
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.error || 'Activation failed');
        navigate('/register');
      }
    };
    if (token) {
      activateAccount();
    }
  }, [token, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Activating Account...</h2>
      </div>
    </div>
  );
};

export default Activate;
