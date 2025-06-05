import { Box, Chip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HashtagList = ({ hashtags }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 2 }}>
      {hashtags.map((hashtag) => {
        return (
          <Chip
            key={hashtag?.hashtag?.id}
            label={`#${hashtag?.hashtag?.tag}`}
            onClick={() => navigate(`/hashtag/${hashtag?.tag}`)}
            sx={{ mr: 1, cursor: 'pointer' }}
          />
        );
      })}
    </Box>
  );
};

export default HashtagList;
