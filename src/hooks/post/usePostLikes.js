import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPostLikes } from '../../services/postService';
import { toast } from 'react-toastify';

function usePostLikes(postId, search, enabled = true) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ['postLikes', postId, search],
      queryFn: ({ pageParam = 1 }) => fetchPostLikes({ pageParam, postId, search }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      enabled: enabled,
    });

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch likes');
  }

  return {
    users: data?.pages.flatMap((page) => page.data.users) || [],
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export default usePostLikes;
