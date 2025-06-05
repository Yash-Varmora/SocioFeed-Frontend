import { useQuery } from '@tanstack/react-query';
import { fetchHashtagSuggestions } from '../services/hashtagService';
import { toast } from 'react-toastify';

function useHashtagSuggestions(query) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hashtagSuggestions', query],
    queryFn: () => fetchHashtagSuggestions({ query }).then((res) => res.data),
    enabled: !!query && query.length >= 2,
    retry: 1,
  });

  if (error) {
    toast.error(error.response?.data?.error || 'Failed to fetch hashtag suggestions');
  }

  return {
    suggestions: data || [],
    isLoading,
  };
}

export default useHashtagSuggestions;
