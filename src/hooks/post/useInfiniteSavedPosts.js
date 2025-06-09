import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSavedPosts } from '../../services/postService';
import { toast } from 'react-toastify';

function useInfiniteSavedPosts() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ['savedPosts'],
      queryFn: ({ pageParam = 1 }) => fetchSavedPosts({ pageParam }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch saved posts');
  }

  return {
    posts: data?.pages.flatMap((page) => page.data.posts) || [],
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export default useInfiniteSavedPosts;
