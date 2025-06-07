import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostLikes from '../../hooks/post/usePostLikes';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import UserListItem from '../follow/UserListItem';
import { useSelector } from 'react-redux';

const LikeModel = ({ open, onClose, postId }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { users, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = usePostLikes(
    postId,
    search,
    !!open,
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>User who liked this post</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        {isLoading ? (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        ) : users.length === 0 ? (
          <Typography>No users found</Typography>
        ) : (
          <>
            {users.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onUserClick={() => navigate(`/profile/${user.username}`)}
                currentProfileUsername={currentUser?.username}
              />
            ))}
            <Box ref={ref} sx={{ textAlign: 'center', my: 2 }}>
              {isFetchingNextPage && <CircularProgress size={24} />}
              {!hasNextPage && users.length > 0 && (
                <Typography color="text.secondary">No more users to load</Typography>
              )}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LikeModel;
