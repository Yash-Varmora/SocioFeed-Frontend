import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AVATAR_URL } from '../../constants';
import useChat from '../../hooks/chat/useChat';
import { formatDistanceToNow } from 'date-fns';
import { useInView } from 'react-intersection-observer';
import useSearchUsers from '../../hooks/useSearchUsers';
import { MdGroupAdd } from 'react-icons/md';
import GroupChatModal from './GroupChatModal';

const ChatList = ({ onSelectChat }) => {
  const { chats, isLoading: isChatsLoading, createDirectChat, createGroupChat } = useChat();
  const {
    searchQuery,
    setSearchQuery,
    users: searchResults,
    isLoading: isSearchLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchUsers();
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleStartDirectChat = (userId) => {
    createDirectChat(
      { receiverId: userId },
      {
        onSuccess: (chat) => {
          onSelectChat(chat);
          setSearchQuery('');
        },
      },
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenGroupModal = () => {
    setOpenGroupModal(true);
  };

  const handleCloseGroupModal = () => {
    setOpenGroupModal(false);
  };

  const handleCreateGroup = (chat) => {
    onSelectChat(chat);
  };

  return (
    <Box
      sx={{
        width: '30%',
        bgcolor: 'grey.100',
        p: 2,
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Chats</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<MdGroupAdd />}
          onClick={handleOpenGroupModal}
        >
          New Group
        </Button>
      </Box>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <Typography color="text.secondary">
                {isSearchLoading ? 'Searching...' : ''}
              </Typography>
            ),
          }}
        />
      </Box>
      {searchQuery && searchResults.length > 0 && (
        <List sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}>
          {searchResults.map((user) => (
            <ListItem
              key={user.id}
              button="true"
              onClick={() => handleStartDirectChat(user.id)}
              sx={{ borderBottom: '1px solid grey.200' }}
            >
              <ListItemAvatar>
                <Avatar src={user.avatarUrl || AVATAR_URL} />
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary={user.bio || 'No bio'} />
            </ListItem>
          ))}
          <Box ref={loadMoreRef} sx={{ textAlign: 'center', py: 2 }}>
            {isFetchingNextPage && <CircularProgress size={24} />}
            {!hasNextPage && searchResults.length > 0 && (
              <Typography color="text.secondary">No more users</Typography>
            )}
          </Box>
        </List>
      )}
      {searchQuery && searchResults.length === 0 && !isSearchLoading && (
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>No users found</Typography>
      )}
      {isChatsLoading ? (
        <Typography>Loading chats...</Typography>
      ) : chats.length === 0 && !searchQuery ? (
        <Typography>No chats yet</Typography>
      ) : (
        <List>
          {chats.map((chat) => (
            <ListItem
              key={chat.id}
              button="true"
              onClick={() => onSelectChat(chat)}
              sx={{ bgcolor: 'white', mb: 1, borderRadius: 1 }}
            >
              <ListItemAvatar>
                <Avatar src={chat.imageUrl || chat.user?.avatarUrl || AVATAR_URL} />
              </ListItemAvatar>
              <ListItemText
                primary={chat.name || chat.user?.username}
                secondary={
                  <Box component="span">
                    <Typography
                      component="span"
                      variant="body2"
                      noWrap
                      sx={{ maxWidth: '200px', display: 'inline' }}
                    >
                      {chat.lastMessage || 'No messages'}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block' }}
                    >
                      {chat.lastActivityAt
                        ? formatDistanceToNow(new Date(chat.lastActivityAt), { addSuffix: true })
                        : 'No activity'}
                    </Typography>
                  </Box>
                }
              />
              {chat.unreadCount > 0 && (
                <Badge badgeContent={chat.unreadCount} color="primary" sx={{ mr: 2 }} />
              )}
            </ListItem>
          ))}
        </List>
      )}
      <GroupChatModal
        open={openGroupModal}
        onClose={handleCloseGroupModal}
        onCreateGroup={handleCreateGroup}
        createGroupChat={createGroupChat}
      />
    </Box>
  );
};

export default ChatList;
