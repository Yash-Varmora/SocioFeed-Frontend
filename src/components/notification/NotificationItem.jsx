import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotificationMessage } from '../../helpers/notificationUtils';
import { formatDistanceToNow } from 'date-fns';
import { AVATAR_URL } from '../../constants';

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (notification.type) {
      case 'FOLLOW':
        navigate(`/profile/${notification.actor.username}`);
        break;

      case 'POST_LIKE':
      case 'POST_COMMENT':
      case 'TAG_IN_POST':
        if (notification.post?.id) {
          navigate(`/post/${notification.post.id}`);
        }
        break;

      case 'COMMENT_LIKE':
      case 'TAG_IN_COMMENT':
        if (notification.comment?.post?.id) {
          navigate(`/post/${notification.comment.post.id}`);
        }
        break;

      case 'DIRECT_MESSAGE':
        navigate(`/messages/${notification.actor.id}`);
        break;

      case 'GROUP_MESSAGE':
      case 'GROUP_INVITE':
      case 'GROUP_MEMBER_JOINED':
        navigate('/groups');
        break;

      default:
        navigate(`/profile/${notification.actor.username}`);
        break;
    }
  };
  return (
    <ListItem
      button="true"
      onClick={handleClick}
      sx={{
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: notification.isRead ? 'transparent' : '#f8f9ff',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <ListItemAvatar>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={notification.actor.avatarUrl || AVATAR_URL}
            alt={notification.actor.username}
          />
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="body2"
            sx={{
              fontWeight: notification.isRead ? 'normal' : 'bold',
              color: notification.isRead ? 'text.secondary' : 'text.primary',
            }}
          >
            {getNotificationMessage(notification)}
          </Typography>
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        }
      />
      {!notification.isRead && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            marginLeft: 1,
          }}
        />
      )}
    </ListItem>
  );
};

export default NotificationItem;
