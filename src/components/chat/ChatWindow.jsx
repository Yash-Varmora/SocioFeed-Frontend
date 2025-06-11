import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/chat/useSocket';
import useMessage from '../../hooks/chat/useMessage';
import { useInView } from 'react-intersection-observer';
import { Box, CircularProgress, Typography } from '@mui/material';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat }) => {
  const { socket } = useSocket();
  const { messages, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMessage(
    chat?.id,
  );
  const [localMessages, setLocalMessages] = useState(messages);
  const messagesEndRef = useRef(null);
  const { ref: loadMoreRef, inView } = useInView();
  useEffect(() => {
    if (messages.length > 0 && localMessages.length === 0) {
      setLocalMessages(messages);
    }
  }, [chat?.id, messages]);

  useEffect(() => {
    if (chat?.id) {
      setLocalMessages([]);
    }
  }, [chat?.id]);
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!chat) {
      return;
    }

    socket.emit('join_chat', { chatId: chat.id });

    socket.on('receive_message', (message) => {
      setLocalMessages((prev) => {
        if (prev.some((msg) => msg.id === message.id)) {
          return prev;
        }
        return [message, ...prev];
      });
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    socket.on('message_updated', (updatedMessage) => {
      setLocalMessages((prev) =>
        prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)),
      );
    });

    socket.on('message_deleted', ({ messageId }) => {
      setLocalMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    });

    return () => {
      socket.emit('leave_chat', { chatId: chat.id });
      socket.off('receive_message');
      socket.off('message_updated');
      socket.off('message_deleted');
    };
  }, [socket, chat?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  if (!chat) {
    return (
      <Box
        sx={{
          flex: 1,
          p: 4,
          bgcolor: 'white',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Select a chat to start messaging</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        p: 4,
        bgcolor: 'white',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {chat.name || chat.user?.username}
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
          pb: 2,
        }}
      >
        <div ref={messagesEndRef} />
        {localMessages.map((message) => (
          <Message
            key={message?.id}
            message={message}
            chatId={chat?.id}
            isGroup={chat.type === 'group'}
          />
        ))}
        <Box ref={loadMoreRef} sx={{ textAlign: 'center', py: 2 }}>
          {isFetchingNextPage && <CircularProgress size={24} />}
          {!hasNextPage && localMessages.length > 0 && (
            <Typography color="text.secondary">No more messages</Typography>
          )}
        </Box>
        {isLoading && <CircularProgress sx={{ mx: 'auto', my: 2 }} />}
      </Box>
      <MessageInput
        chatId={chat.id}
        isGroup={chat.type === 'group'}
        receiverId={chat.type === 'direct' ? chat.user.id : null}
      />
    </Box>
  );
};

export default ChatWindow;
