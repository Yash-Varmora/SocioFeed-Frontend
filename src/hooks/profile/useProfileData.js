import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getProfile, getUserPosts, updateProfile } from '../../services/profileService';

export const useProfileData = (username, navigate) => {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfile(username).then((res) => res.data),
    enabled: !!username,
    onSuccess: () => console.log('useProfileData query succeeded for:', username),
    onError: (err) => console.error('useProfileData query failed:', err),
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      const newUsername = data.data.username;
      queryClient.setQueryData(['profile', newUsername], (oldData) => ({
        ...oldData,
        ...data.data,
      }));
      toast.success('Profile updated!');
      if (newUsername !== username) {
        navigate(`/profile/${newUsername}`);
        queryClient.invalidateQueries(['profile', newUsername]);
      }
    },
    onError: () => toast.error('Failed to update profile'),
  });

  const { data: userPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['userPosts', username],
    queryFn: () => getUserPosts(username).then((res) => res.data),
    enabled: !!profile,
    onSuccess: () => console.log('User posts fetched successfully for:', username),
    onError: (err) => console.error('Failed to fetch user posts:', err),
  });

  return { profile, isLoading, error, updateMutation, userPosts, postsLoading };
};
