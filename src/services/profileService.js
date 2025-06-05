import api from '../api/axiosInstance';

export const getProfile = async (username) => {
  const response = await api.get(`/profile/${username}`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/profile/me', data);
  return response.data;
};

export const uploadAvatar = async (formData, onUploadProgress) => {
  const response = await api.post('/profile/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return response.data;
};

export const getUserPosts = async (username) => {
  const response = await api.get(`/profile/${username}/posts`);
  return response.data;
};
