import api from '../api/axiosInstance';

export const searchUsers = async ({ query, page }) => {
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
  const response = await api.post(`/users/search?page=${page}`, { query });
  return response.data;
};
