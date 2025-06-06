import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setCredentials } from '../../store/slices/authSlice';
import { getUser } from '../../services/authService';

function useAuthCheck() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getUser().then((res) => res.data),
    enabled: isLoggedIn,
    retry: false,
    onError: (err) => console.error('useAuthCheck query failed:', err),
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data }));
    }
  }, [data, dispatch]);

  return { isLoading };
}

export default useAuthCheck;
