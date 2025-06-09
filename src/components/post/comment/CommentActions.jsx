import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { FaHeart, FaRegHeart, FaReply } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { MAX_NESTING_LEVEL } from '../../../constants';

const CommentActions = ({
  comment,
  isOwnComment,
  isLiked,
  handleLikeToggle,
  handleDelete,
  setIsEditing,
  setShowReplyInput,
  showReplyInput,
  isLoading,
  level = 0,
}) => {
  const canReply = level + 1 < MAX_NESTING_LEVEL;
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, ml: 1 }}>
      <IconButton size="small" onClick={handleLikeToggle} disabled={isLoading} sx={{ p: 0.5 }}>
        {isLiked ? <FaHeart size={16} style={{ color: 'red' }} /> : <FaRegHeart size={16} />}
      </IconButton>

      <Typography variant="caption">
        {comment.likeCount ?? comment.commentLikes?.length ?? 0}
      </Typography>

      {canReply ? (
        <Button
          size="small"
          startIcon={<FaReply size={14} />}
          onClick={() => setShowReplyInput(!showReplyInput)}
          disabled={isLoading}
          sx={{ textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', px: 1.2 }}
        >
          Reply
        </Button>
      ) : (
        <Tooltip title="Max reply depth reached">
          <span>
            <Button
              size="small"
              startIcon={<FaReply size={14} />}
              disabled
              sx={{ textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', px: 1.2 }}
            >
              Reply
            </Button>
          </span>
        </Tooltip>
      )}

      {isOwnComment && (
        <>
          <IconButton
            size="small"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            sx={{ p: 0.5 }}
          >
            <MdEdit size={16} />
          </IconButton>
          <IconButton size="small" onClick={handleDelete} disabled={isLoading} sx={{ p: 0.5 }}>
            <MdDelete size={16} />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default CommentActions;
