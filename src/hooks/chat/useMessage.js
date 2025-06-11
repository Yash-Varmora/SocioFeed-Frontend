import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMessages } from '../../services/messageService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

function useMessage(chatId) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: ({ pageParam = 1 }) => fetchMessages({ pageParam, chatId }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.pages) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
    enabled: !!(Cookies.get('isLoggedIn') === 'true') && !!chatId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    },
  });
  return {
    messages: data
      ? [...data.pages]
          .reverse()
          .flatMap((page) => page.data.messages)
          .reverse()
      : [],
    isLoading: isLoading || isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}

export default useMessage;
