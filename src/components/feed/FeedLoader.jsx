import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const FeedLoader = ({ isLoading, posts }) => {
  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (posts.length === 0) {
    return <Typography>No posts to show</Typography>;
  }

  return null;
};

export default FeedLoader;
