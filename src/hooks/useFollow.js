import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '../services/followService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function useFollow(followedId, username) {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.setQueryData(['profile', username], (oldData) => ({
        ...oldData,
        totalFollowers: oldData.totalFollowers + 1,
        followsFollowing: [...(oldData.followsFollowing || []), { followerId: user.id }],
      }));
      toast.success('Followed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to follow user');
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.setQueryData(['profile', username], (oldData) => ({
        ...oldData,
        totalFollowers: oldData.totalFollowers - 1,
        followsFollowing: (oldData.followsFollowing || []).filter((f) => f.followerId !== user.id),
      }));
      toast.success('Unfollowed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to unfollow user');
    },
  });

  return {
    follow: () => followMutation.mutate(followedId),
    unfollow: () => unfollowMutation.mutate(followedId),
    isFollowing: followMutation.isLoading || unfollowMutation.isLoading,
  };
}

export default useFollow;
