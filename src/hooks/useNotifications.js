import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../services/notificationService';

function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications().then((res) => res.data),
    refetchOnWindowFocus: false,
  });
}

export default useNotifications;
