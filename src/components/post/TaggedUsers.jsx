import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaggedUsers = ({ tags }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Tagged:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag) => (
          <Chip
            key={tag.user.id}
            label={tag.user.username}
            onClick={() => navigate(`/profile/${tag.user.username}`)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TaggedUsers;
