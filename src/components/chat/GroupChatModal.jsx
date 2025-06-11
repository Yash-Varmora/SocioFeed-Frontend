import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import useSearchUsers from '../../hooks/useSearchUsers';
import { AVATAR_URL } from '../../constants';

const GroupChatModal = ({ open, onClose, onCreateGroup, createGroupChat }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const {
    searchQuery: groupSearchQuery,
    setSearchQuery: setGroupSearchQuery,
    users: groupSearchResults,
    isLoading: isGroupSearchLoading,
  } = useSearchUsers();

  const handleGroupSearchChange = (e) => {
    setGroupSearchQuery(e.target.value);
  };

  const handleToggleMember = (user) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m.id === user.id)
        ? prev.filter((m) => m.id !== user.id)
        : [...prev, { id: user.id, username: user.username }],
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      return;
    }
    createGroupChat(
      { name: groupName, memberIds: selectedMembers.map((m) => m.id) },
      {
        onSuccess: (chat) => {
          onCreateGroup(chat);
          onClose();
        },
      },
    );
  };

  const handelCancel = () => {
    setGroupName('');
    setSelectedMembers([]);
    setGroupSearchQuery('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handelCancel}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          width: 400,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Create Group Chat</Typography>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          placeholder="Search users to add..."
          value={groupSearchQuery}
          onChange={handleGroupSearchChange}
          sx={{ mb: 2 }}
        />
        {selectedMembers.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {selectedMembers.map((member) => (
              <Chip
                key={member.id}
                label={member.username}
                onDelete={() => handleToggleMember(member)}
                color="primary"
              />
            ))}
          </Box>
        )}
        {groupSearchQuery && groupSearchResults.length > 0 && (
          <List sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
            {groupSearchResults.map((user) => (
              <ListItem
                key={user.id}
                button
                onClick={() => handleToggleMember(user)}
                sx={{
                  bgcolor: selectedMembers.some((m) => m.id === user.id) ? 'grey.200' : 'white',
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatarUrl || AVATAR_URL} />
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={user.bio || 'No bio'} />
              </ListItem>
            ))}
          </List>
        )}
        {groupSearchQuery && groupSearchResults.length === 0 && !isGroupSearchLoading && (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No users found
          </Typography>
        )}
        {isGroupSearchLoading && (
          <CircularProgress size={24} sx={{ display: 'block', mx: 'auto', mb: 2 }} />
        )}
        <Button
          variant="contained"
          fullWidth
          onClick={handleCreateGroup}
          disabled={!groupName.trim() || selectedMembers.length === 0}
        >
          Create Group
        </Button>
      </Box>
    </Modal>
  );
};

export default GroupChatModal;
