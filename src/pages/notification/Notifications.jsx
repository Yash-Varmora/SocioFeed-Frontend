import React, { useEffect } from 'react';
import useNotifications from '../../hooks/useNotifications';
import { toast } from 'react-toastify';
import { Alert, Box, CircularProgress, Divider, List, Typography } from '@mui/material';
import NotificationItem from '../../components/notification/NotificationItem';

const Notifications = () => {
  const { data: notifications, isLoading, error } = useNotifications();

  useEffect(() => {
    if (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }, [error]);

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;
  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Typography variant="body2" color="primary">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load notifications. Please try again.
        </Alert>
      ) : notifications?.length > 0 ? (
        <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <NotificationItem notification={notification} />
              {index < notifications.length - 1 && <Divider variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: 'text.secondary',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No notifications yet
          </Typography>
          <Typography variant="body2">
            When you get notifications, they&#39;ll show up here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
