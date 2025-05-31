import React from 'react';
import FormTextField from '../common/FormTextField';
import { Button, CircularProgress } from '@mui/material';

const ProfileForm = ({ onSubmit, isLoading, errors, register }) => {
  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <FormTextField
        label="Username"
        name="username"
        type="text"
        register={register}
        error={errors['username']}
        disabled={isLoading}
      />
      <FormTextField
        label="Bio"
        multiline
        name="bio"
        type="text"
        register={register}
        error={errors['bio']}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
      </Button>
    </form>
  );
};

export default ProfileForm;
