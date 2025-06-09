import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFollowing } from '../../services/userService';
import { toast } from 'react-toastify';

function useFollowing(username) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['following', username],
      queryFn: ({ pageParam = 1 }) =>
        fetchFollowing({ username, page: pageParam }).then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.pages ? nextPage : undefined;
      },
    });

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch following');
  }
  const allFollowing = data?.pages.flatMap((page) => page.following) || [];
  return {
    following: allFollowing,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    total: data?.pages[0]?.total || 0,
    pages: data?.pages[0]?.pages || 1,
  };
}

export default useFollowing;
