import React, { useEffect } from 'react';
import useInfiniteSavedPosts from '../../hooks/post/useInfiniteSavedPosts';
import { useInView } from 'react-intersection-observer';
import { Box, CircularProgress, Typography } from '@mui/material';
import Post from '../../components/post/Post';

const SavedPosts = () => {
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteSavedPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Box sx={{ maxWidth: '2xl', mx: 'auto', p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Saved Posts
      </Typography>
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Typography>No saved posts to show</Typography>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post?.id} post={post} />
          ))}
          <Box ref={ref} sx={{ textAlign: 'center', my: 2 }}>
            {isFetchingNextPage && <CircularProgress size={24} />}
            {!hasNextPage && posts.length > 0 && (
              <Typography color="text.secondary">No more posts to load</Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SavedPosts;
