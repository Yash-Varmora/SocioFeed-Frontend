import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage }) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
}

export default useInfiniteScroll;
