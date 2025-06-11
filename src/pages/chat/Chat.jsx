import React, { useState } from 'react';
import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';
import { Box } from '@mui/material';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };
  return (
    <Box sx={{ display: 'flex', maxWidth: '100%', mx: 'auto' }}>
      <ChatList onSelectChat={handleSelectChat} />
      <ChatWindow chat={selectedChat} />
    </Box>
  );
};

export default Chat;
