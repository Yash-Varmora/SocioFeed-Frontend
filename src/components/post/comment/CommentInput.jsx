import React, { useEffect, useState } from 'react';
import useComment from '../../../hooks/post/useComment';
import useSearchUsers from '../../../hooks/useSearchUsers';
import { Box, Button, CircularProgress } from '@mui/material';
import { Mention, MentionsInput } from 'react-mentions';
import UserSuggestion from './UserSuggestion';

const CommentInput = ({ postId, parentCommentId, onSubmit, onCancel, autoFocus = false }) => {
  const [content, setContent] = useState('');
  const [mentionIds, setMentionIds] = useState([]);
  const { createComment, isLoading } = useComment(postId, parentCommentId);
  const { users, isLoading: isSuggestionsLoading, setSearchQuery } = useSearchUsers();

  useEffect(() => {
    const mentionMatch = content.match(/@(\w*)$/);
    const mentionQuery = mentionMatch ? mentionMatch[1] : '';
    setSearchQuery(mentionQuery);
  }, [content, setSearchQuery]);

  const handleChange = (e, newValue, newPlainTextValue, mentions) => {
    setContent(newValue);
    const newMentionIds = mentions.map((mention) => mention?.id).filter(Boolean);
    setMentionIds(newMentionIds);
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      return;
    }
    createComment({ content, taggedUserIds: mentionIds });
    setContent('');
    setMentionIds([]);
    setSearchQuery('');
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleCancel = () => {
    setContent('');
    setMentionIds([]);
    setSearchQuery('');
    if (onCancel) {
      onCancel();
    }
  };

  const mentionStyle = {
    control: {
      fontSize: 14,
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: '10px',
      minHeight: '64px',
      backgroundColor: '#fff',
    },
    highlighter: {
      padding: 9,
      borderRadius: 8,
    },
    input: {
      padding: 9,
      minHeight: '64px',
      outline: 'none',
      borderRadius: 8,
    },
    suggestions: {
      list: {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: 6,
        maxHeight: 200,
        overflowY: 'auto',
      },
      item: {
        padding: '8px 12px',
        cursor: 'pointer',
        '&focused': {
          backgroundColor: '#f0f0f0',
        },
      },
    },
  };

  const mentionData = (users || [])
    .filter((user) => user?.id && user?.username)
    .map((user) => ({
      id: user.id,
      display: user.username,
      avatarUrl: user.avatarUrl,
    }));

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'grey.100',
        borderRadius: 2,
        boxShadow: 0,
        mb: 2,
      }}
    >
      <MentionsInput
        value={content}
        onChange={handleChange}
        style={mentionStyle}
        placeholder="Write a comment..."
        autoFocus={autoFocus}
        allowSpaceInQuery={false}
        suggestionsPortalHost={document.body}
      >
        <Mention
          trigger="@"
          data={mentionData}
          markup="@[__display__](__id__)"
          renderSuggestion={(suggestion, search, highlightedDisplay) => (
            <UserSuggestion suggestion={suggestion} highlightedDisplay={highlightedDisplay} />
          )}
          displayTransform={(id, display) => `@${display}`}
        />
      </MentionsInput>

      <Box
        sx={{
          mt: 1.5,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={isLoading || isSuggestionsLoading || !content.trim()}
        >
          {isLoading ? <CircularProgress size={18} /> : 'Post'}
        </Button>
        {onCancel && (
          <Button variant="outlined" size="small" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CommentInput;
