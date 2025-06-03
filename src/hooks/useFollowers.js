import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFollowers } from '../services/userService';
import { toast } from 'react-toastify';

function useFollowers(username) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['followers', username],
      queryFn: ({ pageParam = 1 }) =>
        fetchFollowers({ username, page: pageParam }).then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.pages ? nextPage : undefined;
      },
      staleTime: 5 * 60 * 1000,
    });

  if (error) {
    toast.error(error.response?.data?.error || 'Failed to fetch followers');
  }
  const allFollowers = data?.pages.flatMap((page) => page.followers) || [];
  return {
    followers: allFollowers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    total: data?.pages[0]?.total || 0,
    pages: data?.pages[0]?.pages || 1,
  };
}

export default useFollowers;
