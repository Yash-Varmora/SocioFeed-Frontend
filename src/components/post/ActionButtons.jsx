import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { FaHeart, FaRegComment } from 'react-icons/fa';

const ActionButtons = ({ likeCount, commentCount }) => {
  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Like">
          <IconButton color="primary">
            <FaHeart />
          </IconButton>
        </Tooltip>
        <Typography variant="body2">{likeCount}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Comment">
          <IconButton color="primary">
            <FaRegComment />
          </IconButton>
        </Tooltip>
        <Typography variant="body2">{commentCount}</Typography>
      </Box>
    </Box>
  );
};

export default ActionButtons;
