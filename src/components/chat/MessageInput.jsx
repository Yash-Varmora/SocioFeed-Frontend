import React, { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { MdSend } from 'react-icons/md';
import useSocket from '../../hooks/chat/useSocket';
import { toast } from 'react-toastify';

const MessageInput = ({ chatId, isGroup, receiverId }) => {
  const [content, setContent] = useState('');
  const { socket } = useSocket();

  const handleSubmit = () => {
    if (!content.trim() || !chatId) {
      if (!chatId) {
        toast.error('Chat ID is missing');
        return;
      }
      return;
    }
    socket.emit('send_message', { chatId, content, isGroup, receiverId });
    setContent('');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        bgcolor: 'grey.50',
        borderTop: '1px solid grey.200',
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        variant="outlined"
        size="small"
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
      />
      <IconButton color="primary" onClick={handleSubmit} disabled={!content.trim()}>
        <MdSend />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
