import * as yup from 'yup';

export const profileSchema = yup.object({
  username: yup
    .string()
    .optional()
    .trim()
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only'),
  bio: yup.string().optional().max(160),
});
