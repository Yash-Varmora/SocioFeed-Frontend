import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadAvatar } from '../services/profileService';

export const useAvatarUpload = (username, onUploadSuccess) => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: ({ formData }) =>
      uploadAvatar(formData, (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percent);
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', username]);
      toast.success('Avatar uploaded!');
      setUploadProgress(0);
      onUploadSuccess();
    },
    onError: (error) => {
      console.log(error);
      toast.error('Failed to upload avatar');
      setUploadProgress(0);
    },
  });

  return { uploadMutation, uploadProgress };
};
