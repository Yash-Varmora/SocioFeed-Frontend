import React from 'react';
import useInfiniteScroll from '../../hooks/post/useInfiniteScroll';
import Post from '../post/Post';
import { Box, CircularProgress, Typography } from '@mui/material';

const InfiniteScrollPosts = ({ posts, fetchNextPage, hasNextPage, isFetchingNextPage }) => {
  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  return (
    <>
      {posts.map((post) => (
        <Post key={post?.id} post={post} />
      ))}

      <Box ref={ref} sx={{ textAlign: 'center', my: 2 }}>
        {isFetchingNextPage && <CircularProgress size={50} />}
        {!hasNextPage && posts.length > 0 && (
          <Typography color="text.secondary">No more posts to load</Typography>
        )}
      </Box>
    </>
  );
};

export default InfiniteScrollPosts;
