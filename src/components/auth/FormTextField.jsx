import { TextField } from '@mui/material';
import React from 'react';

const FormTextField = ({ label, register, name, error, type = 'text' }) => {
  return (
    <TextField
      label={label}
      fullWidth
      type={type}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default FormTextField;
