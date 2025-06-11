import api from '../api/axiosInstance';

export const fetchChats = async () => {
  const response = await api.get('/chats');
  return response.data;
};

export const createDirectChat = async ({ receiverId }) => {
  console.log(receiverId);
  const response = await api.post('/chats/direct', { receiverId });
  return response.data;
};

export const createGroupChat = async ({ name, memberIds }) => {
  const response = await api.post('/chats/group', { name, memberIds });
  return response.data;
};
