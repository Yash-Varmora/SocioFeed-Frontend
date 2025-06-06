import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import FeedLoader from '../../components/feed/FeedLoader';
import InfiniteScrollPosts from '../../components/feed/InfiniteScrollPosts';
import useInfiniteFeed from '../../hooks/post/useInfiniteFeed';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFeed();
  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/create-post')}
        sx={{ mb: 4 }}
      >
        Create Post
      </Button>
      <Typography variant="h5" sx={{ my: 4 }}>
        Feed
      </Typography>

      <FeedLoader isLoading={isLoading} posts={posts} />

      {!isLoading && posts.length > 0 && (
        <InfiniteScrollPosts
          posts={posts}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Box>
  );
};

export default Home;
