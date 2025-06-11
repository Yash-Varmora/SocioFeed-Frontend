import React from 'react';
import { AVATAR_URL } from '../../constants';
import { Box, Typography } from '@mui/material';

const ProfileHeader = ({
  avatarUrl,
  username,
  email,
  bio,
  followers,
  following,
  openModal,
  post,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={avatarUrl || AVATAR_URL}
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <Typography variant="h5" fontWeight="bold">
          {username}
        </Typography>
        <Typography color="text.secondary">{email}</Typography>
        <Typography>{bio || 'No bio yet'}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography color="text.secondary" sx={{ cursor: 'pointer' }}>
            Posts: {post}
          </Typography>
          |
          <Typography
            color="text.secondary"
            sx={{ cursor: 'pointer' }}
            onClick={() => openModal('followers')}
          >
            Followers: {followers}
          </Typography>
          |
          <Typography
            color="text.secondary"
            sx={{ cursor: 'pointer' }}
            onClick={() => openModal('following')}
          >
            Following: {following}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default ProfileHeader;
