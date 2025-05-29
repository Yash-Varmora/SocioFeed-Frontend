import React from 'react';
import { Button } from '@mui/material';
import FormTextField from './FormTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = ({ schema, fields, onSubmit, submitLabel, additionalButtons }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map(({ label, name, type }) => (
        <FormTextField
          key={name}
          label={label}
          name={name}
          type={type}
          register={register}
          error={errors[name]}
        />
      ))}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {submitLabel}
      </Button>
      {additionalButtons && additionalButtons}
    </form>
  );
};

export default Form;
