import {
  Avatar,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';
import useFollow from '../../hooks/useFollow';
import { AVATAR_URL } from '../../constants';
import { useSelector } from 'react-redux';

const UserListItem = ({ user, onUserClick }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { follow, unfollow, isFollowing } = useFollow(user.id, user.username);

  const isFollowingUser =
    user.followsFollowing?.some((f) => f.followerId === currentUser?.id) || false;
  const isOwnProfile = currentUser?.id === user.id;
  return (
    <ListItem
      secondaryAction={
        !isOwnProfile && (
          <Button
            variant="outlined"
            size="small"
            color={isFollowingUser ? 'secondary' : 'primary'}
            onClick={isFollowingUser ? unfollow : follow}
            disabled={isFollowing}
          >
            {isFollowing ? (
              <CircularProgress size={16} />
            ) : isFollowingUser ? (
              'Following'
            ) : (
              'Follow'
            )}
          </Button>
        )
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatarUrl || AVATAR_URL} alt={user.username} />
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        onClick={() => onUserClick(user.username)}
        sx={{ cursor: 'pointer' }}
      />
    </ListItem>
  );
};

export default UserListItem;
