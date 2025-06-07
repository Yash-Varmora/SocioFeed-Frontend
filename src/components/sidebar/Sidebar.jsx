import React, { useState } from 'react';
import { Avatar, Divider, Drawer, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import { FaBookmark, FaHome, FaPlusSquare, FaSearch } from 'react-icons/fa';
import { MdNotifications, MdOutlineLogout } from 'react-icons/md';
import { AVATAR_URL } from '../../constants';
import useLogout from '../../hooks/auth/useLogout';

const drawerWidthOpen = 250;
const drawerWidthClosed = 72;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();

  const items = [
    {
      label: 'Home',
      icon: <FaHome size={28} />,
      onClick: () => navigate('/'),
    },
    {
      label: 'Profile',
      icon: (
        <Avatar
          sx={{
            width: 32,
            height: 32,
            transition: 'all 0.3s ease-in-out',
          }}
          src={user?.avatarUrl || AVATAR_URL}
        />
      ),
      onClick: () => navigate(`/profile/${user?.username}`),
    },
    {
      label: 'Search',
      icon: <FaSearch size={28} />,
      onClick: () => navigate('/search'),
    },
    {
      label: 'Create Post',
      icon: <FaPlusSquare size={28} />,
      onClick: () => navigate('/create-post'),
    },
    {
      label: 'Saved Posts',
      icon: <FaBookmark size={28} />,
      onClick: () => navigate('/saved-posts'),
    },
    {
      label: 'Notifications',
      icon: <MdNotifications size={28} />,
      onClick: () => navigate('/notifications'),
    },
    {
      label: 'Logout',
      icon: <MdOutlineLogout size={28} />,
      onClick: logout,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          borderRight: '1px solid #ddd',
        },
      }}
    >
      <SidebarHeader open={open} setOpen={setOpen} user={user} />
      <Divider />
      <List sx={{ transition: 'padding 0.3s' }}>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} open={open} />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
