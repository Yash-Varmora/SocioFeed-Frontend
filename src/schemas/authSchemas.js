import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .transform((value) => value?.trim()),
  username: yup
    .string()
    .required('Username is required')
    .transform((value) => value?.trim()),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .transform((value) => value?.trim()),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
    .transform((value) => value?.trim()),
});

export const loginSchema = yup.object({
  emailOrUsername: yup
    .string()
    .required('Email or username is required')
    .transform((value) => value?.trim()),
  password: yup
    .string()
    .required('Password is required')
    .transform((value) => value?.trim()),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .transform((value) => value?.trim()),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .transform((value) => value?.trim()),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
    .transform((value) => value?.trim()),
});
