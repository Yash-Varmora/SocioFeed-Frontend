import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchMutualFriends } from '../../services/userService';

function useMutualFriends(username, isOwnProfile) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['mutualFriends', username],
      queryFn: ({ pageParam = 1 }) =>
        fetchMutualFriends({ username, page: pageParam }).then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.pages ? nextPage : undefined;
      },
      enabled: !isOwnProfile,
      onError: () => console.log('Mutual friends error for:', username),
    });

  if (error) {
    console.log('Mutual friends error for:', username, error);
    toast.error(error.response?.data?.message || 'Failed to fetch mutual friends');
  }
  const allMutualFriends = data?.pages.flatMap((page) => page.mutualFriends) || [];
  return {
    mutualFriends: allMutualFriends,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    total: data?.pages[0]?.total || 0,
    pages: data?.pages[0]?.pages || 1,
  };
}

export default useMutualFriends;
