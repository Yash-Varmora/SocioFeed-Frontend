import React from 'react';
import { toast } from 'react-toastify';
import Form from './Form';
import { forgotPasswordSchema } from '../../schemas/authSchemas';
import { forgotPassword } from '../../services/authService';

const ForgotPasswordForm = ({ onSuccess }) => {
  const handleForgot = async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success('Password reset email sent!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed');
    }
  };

  const fields = [{ label: 'Email', name: 'email' }];

  return (
    <Form
      schema={forgotPasswordSchema}
      fields={fields}
      onSubmit={handleForgot}
      submitLabel="Send Reset Email"
    />
  );
};

export default ForgotPasswordForm;
