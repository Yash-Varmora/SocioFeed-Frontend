import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../../services/postService';
import { toast } from 'react-toastify';

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries(['feed']);
      const previousPosts = queryClient.getQueryData(['feed']);
      queryClient.setQueryData(['feed'], (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              posts: page.posts.filter((post) => post.id !== postId),
            };
          }),
        };
      });
      return { previousPosts };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(['feed'], context.previousPosts);
      toast.error(error.response?.data?.message || 'Failed to delete post');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      toast.success('Post deleted successfully!');
    },
  });
}
