import { useEffect, useState } from 'react';
import { searchUsers } from '../services/userService';
import { toast } from 'react-toastify';
import { useInfiniteQuery } from '@tanstack/react-query';

const useSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['searchUsers', debouncedQuery],
      queryFn: ({ pageParam = 1 }) =>
        searchUsers({ query: debouncedQuery, page: pageParam }).then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.pages ? nextPage : undefined;
      },
      enabled: !!debouncedQuery,
      retry: false,
    });

  if (error) {
    toast.error(error.response?.data?.error || 'Failed to search users');
  }

  const allUsers = data?.pages.flatMap((page) => page.users) || [];
  return {
    searchQuery,
    setSearchQuery,
    users: allUsers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    total: data?.pages[0]?.total || 0,
    pages: data?.pages[0]?.pages || 1,
  };
};

export default useSearchUsers;
