import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';

const ActionButtons = ({
  likeCount,
  commentCount,
  isLiked,
  isPostSaved,
  onLikeClick,
  onSavePostClick,
  openLikesModal,
  onCommentClick,
}) => {
  const handleOpenLikesModelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLikesModal(true);
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeClick();
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSavePostClick();
  };
  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Like">
          <IconButton color="inherit" onClick={handleLikeClick}>
            {isLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
          </IconButton>
        </Tooltip>
        <Typography variant="body2" onClick={handleOpenLikesModelClick} sx={{ cursor: 'pointer' }}>
          {likeCount}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Comment">
          <IconButton color="primary" onClick={onCommentClick}>
            <FaRegComment />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" onClick={onCommentClick} sx={{ cursor: 'pointer' }}>
          {commentCount}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={isPostSaved ? 'Unsave Post' : 'Save Post'}>
          <IconButton color={isPostSaved ? 'secondary' : 'default'} onClick={handleSaveClick}>
            {isPostSaved ? <FaBookmark style={{ color: 'black' }} /> : <FaRegBookmark />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ActionButtons;
