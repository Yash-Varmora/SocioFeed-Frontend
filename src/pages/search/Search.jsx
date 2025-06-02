import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchUsers from '../../hooks/useSearchUsers';
import {
  Avatar,
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
import { AVATAR_URL } from '../../constants';

const Search = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, users, isLoading, page, setPage, total, pages } =
    useSearchUsers();

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const handleLoadMore = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search Users
      </Typography>
      <TextField
        label="Search by username"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter username..."
        sx={{ mb: 3 }}
      />
      {isLoading && page === 1 ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : users.length > 0 ? (
        <>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} button="true" onClick={() => handleUserClick(user.username)}>
                <ListItemAvatar>
                  <Avatar src={user.avatarUrl || AVATAR_URL} alt={user.username} />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
          {page < pages && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="contained" onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Load More'}
              </Button>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Showing {users.length} of {total} users
          </Typography>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          {searchQuery ? 'No users found' : 'Start typing to search'}
        </Typography>
      )}
    </Box>
  );
};

export default Search;
