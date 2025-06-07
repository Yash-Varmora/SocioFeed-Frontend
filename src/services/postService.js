import api from '../api/axiosInstance';

export const createPost = async ({ content, visibility, media, taggedUserIds, hashtags }) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('visibility', visibility);

  if (taggedUserIds?.length) {
    formData.append('taggedUserIds', JSON.stringify(taggedUserIds));
  }
  if (hashtags?.length) {
    formData.append('hashtags', JSON.stringify(hashtags));
  }

  media.forEach((file) => formData.append('media', file));

  const response = await api.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const fetchFeed = async ({ pageParam }) => {
  const response = await api.get(`/posts/feed?page=${pageParam}`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const updatePost = async ({ id, content, visibility }) => {
  const response = await api.put(`/posts/${id}`, { content, visibility });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const unlikePost = async (id) => {
  const response = await api.delete(`/posts/${id}/like`);
  return response.data;
};

export const savePost = async (id) => {
  const response = await api.post(`/posts/${id}/save`);
  return response.data;
};

export const unsavePost = async (id) => {
  const response = await api.delete(`/posts/${id}/save`);
  return response.data;
};

export const fetchPostLikes = async ({ pageParam, postId, search }) => {
  const response = await api.get(`/posts/${postId}/likes`, {
    params: { page: pageParam, search },
  });
  return response.data;
};

export const fetchSavedPosts = async ({ pageParam }) => {
  const response = await api.get(`/posts/saved?page=${pageParam}`);
  return response.data;
};
