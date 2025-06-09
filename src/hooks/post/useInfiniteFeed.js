import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeed } from '../../services/postService';
import { toast } from 'react-toastify';

function useInfiniteFeed(username) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ['feed', username],
      queryFn: ({ pageParam = 1 }) => fetchFeed({ pageParam, username }),
      getNextPageParam: (lastPage) =>
        lastPage.data.page < lastPage.data.pages ? lastPage.data.page + 1 : undefined,
    });

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch feed');
  }
  return {
    posts: data?.pages.flatMap((page) => page.data.posts) || [],
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export default useInfiniteFeed;
