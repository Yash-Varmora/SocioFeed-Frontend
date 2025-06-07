import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savePost, unsavePost } from '../../services/postService';
import { toast } from 'react-toastify';

function useSave(postId) {
  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn: savePost,
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
            posts: page.posts.map((post) => (post.id === id ? { ...post, isSaved: true } : post)),
          })),
        };
      });
      return { previousFeed };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['feed'], context.previousFeed);
      toast.error(error.response?.data?.error || 'Failed to save post');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['feed']);
    },
  });

  const unsavePostMutation = useMutation({
    mutationFn: unsavePost,
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
            posts: page.posts.map((post) => (post.id === id ? { ...post, isSaved: false } : post)),
          })),
        };
      });
      return { previousFeed };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['feed'], context.previousFeed);
      toast.error(error.response?.data?.error || 'Failed to unsave post');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['feed']);
    },
  });

  return {
    savePost: () => savePostMutation.mutate(postId),
    unsavePost: () => unsavePostMutation.mutate(postId),
    isLoading: savePostMutation.isLoading || unsavePostMutation.isLoading,
  };
}

export default useSave;
