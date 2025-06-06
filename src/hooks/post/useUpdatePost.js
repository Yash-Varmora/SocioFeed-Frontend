import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../../services/postService';
import { toast } from 'react-toastify';

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['userPost'] });
      toast.success('Post updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to update post');
    },
  });
}
