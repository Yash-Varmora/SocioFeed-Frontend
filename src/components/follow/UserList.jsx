import { Box, Button, CircularProgress, List, Typography } from '@mui/material';
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
  isOwnProfile,
  onUserClick,
}) => {
  const users = type === 'followers' ? followers : type === 'following' ? following : mutualFriends;

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box>
      <List>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} onUserClick={onUserClick} />
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
