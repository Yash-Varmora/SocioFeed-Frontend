import api from '../api/axiosInstance';

export const searchUsers = async ({ query, page, limit }) => {
  if (!query) {
    return {
      data: {
        users: [],
        total: 0,
        page: 1,
        pages: 1,
      },
    };
  }
  const response = await api.post(`/users/search?page=${page}&limit=${limit}`, { query });
  return response.data;
};

export const fetchFollowers = async ({ username, page }) => {
  const response = await api.get(`/users/${username}/followers?page=${page}`);
  return response.data;
};

export const fetchFollowing = async ({ username, page }) => {
  const response = await api.get(`/users/${username}/following?page=${page}`);
  return response.data;
};

export const fetchMutualFriends = async ({ username, page }) => {
  const response = await api.get(`/users/${username}/mutual-friends?page=${page}`);
  return response.data;
};
