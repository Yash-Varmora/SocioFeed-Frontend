import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchComments } from '../../services/commentService';
import { toast } from 'react-toastify';

function useInfiniteComments(postId, parentCommentId = null) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ['comments', postId, parentCommentId],
      queryFn: ({ pageParam = 1 }) => fetchComments({ pageParam, postId, parentCommentId }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000,
    });

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch comments');
  }
  return {
    comments: data?.pages.flatMap((page) => page.data.comments) || [],
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export default useInfiniteComments;
