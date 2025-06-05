import React from 'react';
import useInfiniteFeed from '../hooks/useInfiniteFeed';
import { Box, Typography } from '@mui/material';
import PostEditor from '../components/post/postEditor/PostEditor';
import FeedLoader from '../components/feed/FeedLoader';
import InfiniteScrollPosts from '../components/feed/InfiniteScrollPosts';

const Home = () => {
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFeed();
  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4 }}>
      <PostEditor />

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
