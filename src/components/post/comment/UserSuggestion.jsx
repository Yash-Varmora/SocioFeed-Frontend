import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { AVATAR_URL } from '../../../constants';

const UserSuggestion = ({ suggestion, highlightedDisplay }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <Avatar src={suggestion?.avatarUrl || AVATAR_URL} sx={{ mr: 1, width: 24, height: 24 }} />
      <Typography variant="body2">{highlightedDisplay}</Typography>
    </Box>
  );
};

export default UserSuggestion;
