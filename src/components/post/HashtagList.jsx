import { Box, Chip } from '@mui/material';
import React from 'react';

const HashtagList = ({ hashtags, handleHashTagClick }) => {
  return (
    <Box sx={{ mb: 2 }}>
      {hashtags.map((hashtag) => {
        return (
          <Chip
            key={hashtag?.hashtag?.id}
            label={`#${hashtag?.hashtag?.tag}`}
            onClick={handleHashTagClick}
            sx={{ mr: 1, cursor: 'pointer' }}
          />
        );
      })}
    </Box>
  );
};

export default HashtagList;
