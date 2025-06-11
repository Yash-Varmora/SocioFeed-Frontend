import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDirectChat, createGroupChat, fetchChats } from '../../services/chatService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function useChat() {
  const queryClient = useQueryClient();

  const { data: chats, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: () => fetchChats().then((res) => res.data.chats),
    enabled: !!(Cookies.get('isLoggedIn') === 'true'),
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to fetch chats');
    },
  });

  const createDirectChatMutation = useMutation({
    mutationFn: ({ receiverId }) =>
      createDirectChat(receiverId).then((res) => {
        return res.data.chat;
      }),
    onSuccess: (newChat, variables, context) => {
      queryClient.setQueryData(['chats'], (oldChats) => {
        if (!oldChats) {
          return [newChat];
        }
        const existingChatIndex = oldChats.findIndex((chat) => chat.id === newChat.id);
        if (existingChatIndex !== -1) {
          const updatedChats = [...oldChats];
          const [movedChat] = updatedChats.splice(existingChatIndex, 1);
          return [movedChat, ...updatedChats];
        } else {
          return [newChat, ...oldChats];
        }
      });

      toast.success('Direct chat created!');
      if (context?.onSuccess) {
        context.onSuccess(newChat);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to create direct chat');
    },
  });

  const createGroupChatMutation = useMutation({
    mutationFn: ({ name, memberIds }) => createGroupChat({ name, memberIds }),
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
      toast.success('Group chat created!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create group chat');
    },
  });

  return {
    chats: chats || [],
    isLoading: isLoading || createDirectChatMutation.isPending || createGroupChatMutation.isPending,
    createDirectChat: (receiverId, options = {}) =>
      createDirectChatMutation.mutate(
        { receiverId },
        {
          onSuccess: (response) => {
            options.onSuccess?.(response);
          },
        },
      ),
    createGroupChat: (data, options = {}) =>
      createGroupChatMutation.mutate(data, {
        onSuccess: (response) => {
          options.onSuccess?.(response);
        },
      }),
  };
}

export default useChat;
