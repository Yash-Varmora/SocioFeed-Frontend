import { TextField } from '@mui/material';
import React from 'react';

const FormTextField = ({
  label,
  register,
  name,
  error,
  type = 'text',
  multiline = false,
  disabled = false,
}) => {
  return (
    <TextField
      label={label}
      fullWidth
      multiline={multiline}
      type={!multiline ? type : undefined}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      disabled={disabled}
    />
  );
};

export default FormTextField;
