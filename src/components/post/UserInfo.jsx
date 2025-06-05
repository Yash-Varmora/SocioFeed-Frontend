import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { AVATAR_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const UserInfo = ({ user, createdAt, visibility }) => {
  const navigate = useNavigate();

  const formattedTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : 'Unknown time';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar
        src={user?.avatarUrl || AVATAR_URL}
        sx={{ mr: 2, cursor: 'pointer' }}
        onClick={() => navigate(`/profile/${user?.username}`)}
      />
      <Box>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/profile/${user?.username}`)}
        >
          {user?.username}
        </Typography>
        <Typography color="text.secondary">{formattedTime}</Typography>
        <Typography color="text.secondary">{visibility}</Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
