import { toast } from 'react-toastify';
import { getPostById } from '../../services/postService';
import { useQuery } from '@tanstack/react-query';

function usePostById(postId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId).then((res) => res.data),
  });

  if (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch post');
  }

  return { post: data, isLoading };
}

export default usePostById;
