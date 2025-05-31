import React from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { TbChevronLeftPipe, TbChevronRightPipe } from 'react-icons/tb';
import { AVATAR_URL } from '../../constants';

const SidebarHeader = ({ open, setOpen, user }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'space-between' : 'center',
        flexDirection: open ? 'row' : 'column',
        gap: open ? 2 : 1,
        height: 64,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {open && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={user?.avatarUrl || AVATAR_URL} sx={{ width: 40, height: 40 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'all 0.3s ease-in-out',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.username}
          </Typography>
        </Box>
      )}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {open ? <TbChevronLeftPipe size={28} /> : <TbChevronRightPipe size={28} />}
      </IconButton>
    </Box>
  );
};

export default SidebarHeader;
