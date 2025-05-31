import { TextField } from '@mui/material';
import React from 'react';

const FormTextField = ({ label, register, name, error, type = 'text', multiline = false }) => {
  return (
    <TextField
      label={label}
      fullWidth
      multiline={multiline}
      type={!multiline ? type : undefined}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default FormTextField;
