import { Box, Button, CircularProgress, List, TextField, Typography } from '@mui/material';
import React from 'react';
import UserListItem from './UserListItem';

const UserList = ({
  type,
  followers = [],
  following = [],
  mutualFriends = [],
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  total,
  currentProfileUsername,
  isOwnProfile,
  onUserClick,
  search,
  setSearch,
}) => {
  const users = type === 'followers' ? followers : type === 'following' ? following : mutualFriends;

  const filterUsers = (users) =>
    users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box>
      <TextField
        label="Search Profiles"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <List>
        {filterUsers(users).map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            onUserClick={onUserClick}
            currentProfileUsername={currentProfileUsername}
          />
        ))}
      </List>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Typography sx={{ textAlign: 'center', my: 2 }}>
          No {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </Typography>
      ) : (
        (type !== 'mutualFriends' || !isOwnProfile) && (
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <Button
              variant="contained"
              onClick={handleLoadMore}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? <CircularProgress size={20} /> : 'Load More'}
            </Button>
          </Box>
        )
      )}

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        Showing {users.length} of {total} users
      </Typography>
    </Box>
  );
};

export default UserList;
