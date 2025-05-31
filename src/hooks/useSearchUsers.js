import { useEffect, useState } from 'react';
import { searchUsers } from '../services/userService';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const useSearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchUsers', debouncedQuery, page],
    queryFn: () => searchUsers({ query: debouncedQuery, page }).then((res) => res.data),
    enabled: !!debouncedQuery,
    retry: false,
  });

  if (error) {
    toast.error(error.response?.data?.error || 'Failed to search users');
  }
  return {
    searchQuery,
    setSearchQuery,
    users: data?.users || [],
    isLoading,
    page,
    setPage,
    total: data?.total || 0,
    pages: data?.pages || 1,
  };
};

export default useSearchUsers;
