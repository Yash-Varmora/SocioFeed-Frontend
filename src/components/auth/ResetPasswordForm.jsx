import React from 'react';
import { toast } from 'react-toastify';
import Form from './Form';
import { resetPasswordSchema } from '../../schemas/authSchemas';
import { resetPassword } from '../../services/authService';

const ResetPasswordForm = ({ token, onSuccess }) => {
  const handleReset = async (data) => {
    try {
      await resetPassword(token, data.newPassword);
      toast.success('Password reset successful! Please login.');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    }
  };

  const fields = [
    { label: 'New Password', name: 'newPassword', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
  ];

  return (
    <Form
      schema={resetPasswordSchema}
      fields={fields}
      onSubmit={handleReset}
      submitLabel="Reset Password"
    />
  );
};

export default ResetPasswordForm;
