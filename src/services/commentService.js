import api from '../api/axiosInstance';

export const createComment = async ({ postId, parentCommentId, content, taggedUserIds }) => {
  const response = await api.post('/comments', {
    postId,
    parentCommentId,
    content,
    taggedUserIds: taggedUserIds ? JSON.stringify(taggedUserIds) : undefined,
  });
  return response.data.comment;
};

export const editComment = async ({ id, content }) => {
  const response = await api.patch(`/comments/${id}`, { content });
  return response.data.comment;
};

export const deleteComment = async ({ id }) => {
  await api.delete(`/comments/${id}`);
};

export const fetchComments = async ({ pageParam = 1, postId, parentCommentId }) => {
  const url = parentCommentId
    ? `/comments/${postId}?page=${pageParam}&parentCommentId=${parentCommentId}`
    : `/comments/${postId}?page=${pageParam}`;
  const response = await api.get(url);
  return response.data;
};

export const likeComment = async ({ id }) => {
  const response = await api.post(`/comments/${id}/like`);
  return response.data;
};

export const unlikeComment = async ({ id }) => {
  const response = await api.delete(`/comments/${id}/like`);
  return response.data;
};
