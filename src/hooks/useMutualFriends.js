import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchMutualFriends } from '../services/userService';
import { useMemo } from 'react';

function useMutualFriends(username, isOwnProfile) {
  const memoizedIsOwnProfile = useMemo(() => isOwnProfile, [isOwnProfile]);
  const {
    data: mutualFriends,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['mutualFriends', username],
    queryFn: () => fetchMutualFriends(username).then((res) => res.data),
    enabled: !memoizedIsOwnProfile,
    staleTime: 5 * 60 * 1000,
    onError: () => console.log('Mutual friends error for:', username),
  });

  if (error) {
    console.log('Mutual friends error for:', username, error);
    toast.error(error.response?.data?.error || 'Failed to fetch mutual friends');
  }

  return {
    mutualFriends: mutualFriends || [],
    isLoading,
  };
}

export default useMutualFriends;
