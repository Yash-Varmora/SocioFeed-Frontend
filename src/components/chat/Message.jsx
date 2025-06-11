import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { AVATAR_URL } from '../../constants';
import { MdDelete, MdEdit } from 'react-icons/md';
import useSocket from '../../hooks/chat/useSocket';

const Message = ({ message, isGroup }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const { socket } = useSocket();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message?.content);

  const isOwnMessage = currentUser?.id === message?.senderId;
  const canEdit =
    isOwnMessage && new Date(message.createdAt) > new Date(Date.now() - 5 * 60 * 1000);

  const handleUpdate = () => {
    socket.emit('update_message', { messageId: message.id, content: editContent });
    setIsEditing(false);
  };

  const handleDelete = () => {
    socket.emit('delete_message', { messageId: message.id });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          maxWidth: '60%',
          flexDirection: isOwnMessage ? 'row-reverse' : 'row',
        }}
      >
        {!isOwnMessage && (
          <Avatar
            src={message?.sender?.avatarUrl || AVATAR_URL}
            sx={{ mr: isOwnMessage ? 0 : 1, ml: isOwnMessage ? 1 : 0 }}
          />
        )}
        <Box
          sx={{
            bgcolor: isOwnMessage ? 'primary.light' : 'grey.200',
            p: 2,
            borderRadius: 2,
            position: 'relative',
          }}
        >
          {isGroup && !isOwnMessage && (
            <Typography variant="caption" color="text.secondary">
              {message.sender.username}
            </Typography>
          )}
          {isEditing ? (
            <Box>
              <TextField
                fullWidth
                multiline
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                size="small"
              />
              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Button variant="contained" size="small" onClick={handleUpdate}>
                  Save
                </Button>
                <Button variant="outlined" size="small" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2">{message?.content}</Typography>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </Typography>
          {isOwnMessage && (
            <Box sx={{ position: 'absolute', top: 0, right: isOwnMessage ? 0 : 0 }}>
              {canEdit && (
                <IconButton size="small" onClick={() => setIsEditing(true)}>
                  <MdEdit fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" onClick={handleDelete}>
                <MdDelete fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
