import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadAvatar } from '../../services/profileService';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

export const useAvatarUpload = (username, onUploadSuccess) => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const uploadMutation = useMutation({
    mutationFn: ({ formData }) =>
      uploadAvatar(formData, (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setUploadProgress(percent);
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', username], (oldData) => ({
        ...oldData,
        avatarUrl: data.data.avatarUrl,
      }));

      toast.success('Avatar uploaded!');
      dispatch(
        setCredentials({
          user: {
            ...user,
            avatarUrl: data.data.avatarUrl,
          },
        }),
      );
      queryClient.invalidateQueries(['post']);
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
