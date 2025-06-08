import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommentContent = ({
  comment,
  isEditing,
  editContent,
  setEditContent,
  handleEdit,
  setIsEditing,
  postId,
}) => {
  const navigate = useNavigate();

  const renderContent = () => {
    const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(comment.content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: comment.content.slice(lastIndex, match.index),
        });
      }

      const username = match[1];
      const userId = match[2];
      const taggedUser = comment.tagsInComments.find((tag) => tag.user.id === userId);

      parts.push({
        type: 'mention',
        content: `@${username}`,
        username,
        userId,
        taggedUser,
      });

      lastIndex = mentionRegex.lastIndex;
    }

    if (lastIndex < comment.content.length) {
      parts.push({
        type: 'text',
        content: comment.content.slice(lastIndex),
      });
    }

    if (parts.length === 0) {
      parts.push({ type: 'text', content: comment.content });
    }

    return parts.map((part, index) => {
      if (part.type === 'mention') {
        return (
          <Chip
            key={index}
            label={part.content}
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              if (part.taggedUser) {
                navigate(`/profile/${part.username}`);
              }
            }}
            sx={{
              mx: 0.5,
              my: 0.3,
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          />
        );
      }
      return (
        <Typography
          key={index}
          component="span"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: '0.875rem',
          }}
        >
          {part.content}
        </Typography>
      );
    });
  };

  return isEditing ? (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        multiline
        minRows={3}
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            fontSize: '0.9rem',
          },
        }}
      />
      <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button variant="contained" size="small" onClick={handleEdit}>
          Save
        </Button>
        <Button variant="outlined" size="small" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        mb: 1,
        ml: 1,
        cursor: 'pointer',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0.5,
      }}
      onClick={() => navigate(`/post/${postId}`, { state: { focusCommentInput: true } })}
    >
      {renderContent()}
    </Box>
  );
};

export default CommentContent;
