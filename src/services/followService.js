import api from '../api/axiosInstance';

export const followUser = async (followingId) => {
  const response = await api.post('/follows', { followingId });
  return response.data;
};

export const unfollowUser = async (followingId) => {
  const response = await api.delete(`/follows/${followingId}`);
  return response.data;
};
