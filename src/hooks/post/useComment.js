import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createComment,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from '../../services/commentService';
import { toast } from 'react-toastify';

function useComment(postId, parentCommentId = null) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (data, { postId, parentCommentId }) => {
      queryClient.invalidateQueries(['comments', postId, parentCommentId]);
      queryClient.invalidateQueries(['post', postId]);
      toast.success('Comment posted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to post comment');
    },
  });

  const editMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
      toast.success('Comment updated!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update comment');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, { postId, parentCommentId }) => {
      queryClient.invalidateQueries(['comments', postId, parentCommentId]);
      queryClient.invalidateQueries(['post', postId]);
      toast.success('Comment deleted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete comment');
    },
  });

  const likeMutation = useMutation({
    mutationFn: likeComment,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(['comments']);
      const previousComments = queryClient.getQueryData(['comments']);
      queryClient.setQueryData(['comments'], (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            comments: page.comments.map((comment) =>
              comment.id === id
                ? { ...comment, isLiked: true, likeCount: (comment.likeCount || 0) + 1 }
                : comment,
            ),
          })),
        };
      });
      return { previousComments };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['comments'], context.previousComments);
      toast.error(error.response?.data?.message || 'Failed to like comment');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeComment,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(['comments']);
      const previousComments = queryClient.getQueryData(['comments']);
      queryClient.setQueryData(['comments'], (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            comments: page.comments.map((comment) =>
              comment.id === id
                ? { ...comment, isLiked: false, likeCount: (comment.likeCount || 0) - 1 }
                : comment,
            ),
          })),
        };
      });
      return { previousComments };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['comments'], context.previousComments);
      toast.error(error.response?.data?.message || 'Failed to unlike comment');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  return {
    createComment: (data) => createMutation.mutate({ postId, parentCommentId, ...data }),
    editComment: (data) => editMutation.mutate(data),
    deleteComment: (data) => deleteMutation.mutate({ id: data.id, postId, parentCommentId }),
    likeComment: (id) => likeMutation.mutate({ id }),
    unlikeComment: (id) => unlikeMutation.mutate({ id }),
    isLoading:
      createMutation.isPending ||
      editMutation.isPending ||
      deleteMutation.isPending ||
      likeMutation.isPending ||
      unlikeMutation.isPending,
  };
}

export default useComment;
