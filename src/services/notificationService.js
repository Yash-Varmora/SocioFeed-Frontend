import api from '../api/axiosInstance';

export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};
