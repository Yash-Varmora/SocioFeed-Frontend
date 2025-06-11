import api from '../api/axiosInstance';

export const fetchMessages = async ({ pageParam = 1, chatId }) => {
  const response = await api.get(`/messages/${chatId}?page=${pageParam}`);
  return response.data;
};
