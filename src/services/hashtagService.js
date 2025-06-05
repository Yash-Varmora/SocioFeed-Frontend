import api from '../api/axiosInstance';

export const fetchHashtagSuggestions = async ({ query }) => {
  const response = await api.get('/hashtags/suggest', {
    params: { query },
  });
  return response.data;
};
