import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { setCredentials } from '../store/slices/authSlice';
import { getUser } from '../services/authService';

function useAuthCheck() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getUser().then((res) => res.data),
    enabled: isLoggedIn,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data }));
    }
    if (error) {
      console.error('Auth check failed:', error);
    }
  }, [data, error, dispatch]);

  return { isLoading };
}

export default useAuthCheck;
