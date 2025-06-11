import React, { useTransition } from 'react';
import { Button } from '@mui/material';
import FormTextField from '../common/FormTextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = ({ schema, fields, onSubmit, submitLabel, additionalButtons }) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitWithTransition = (data) => {
    startTransition(async () => {
      await onSubmit(data);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWithTransition)} className="space-y-4">
      {fields.map(({ label, name, type }) => (
        <FormTextField
          key={name}
          label={label}
          name={name}
          type={type}
          register={register}
          error={errors[name]}
          disabled={isPending}
        />
      ))}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
        {isPending ? ' Submitting...' : submitLabel}
      </Button>
      {additionalButtons && additionalButtons}
    </form>
  );
};

export default Form;
