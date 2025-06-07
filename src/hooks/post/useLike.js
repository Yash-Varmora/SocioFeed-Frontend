import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, unlikePost } from '../../services/postService';
import { toast } from 'react-toastify';

function useLike(postId) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries(['feed']);
      const previousFeed = queryClient.getQueryData(['feed']);
      queryClient.setQueryData(['feed'], (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === id ? { ...post, likeCount: post.likeCount + 1, isLike: true } : post,
            ),
          })),
        };
      });
      return { previousFeed };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['feed'], context.previousFeed);
      toast.error(error.response?.data?.error || 'Failed to like post');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['feed']);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries(['feed']);
      const previousFeed = queryClient.getQueryData(['feed']);
      queryClient.setQueryData(['feed'], (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === id ? { ...post, likeCount: post.likeCount - 1, isLike: false } : post,
            ),
          })),
        };
      });
      return { previousFeed };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['feed'], context.previousFeed);
      toast.error(error.response?.data?.error || 'Failed to unlike post');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['feed']);
    },
  });

  return {
    like: () => likeMutation.mutate(postId),
    unlike: () => unlikeMutation.mutate(postId),
    isLoading: likeMutation.isPending || unlikeMutation.isPending,
  };
}

export default useLike;
