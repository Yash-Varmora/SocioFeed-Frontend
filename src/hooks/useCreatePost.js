import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createPost } from '../services/postService';
import { toast } from 'react-toastify';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      toast.success('Post created!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to create post');
    },
  });
}
