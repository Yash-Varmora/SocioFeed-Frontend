import React from 'react';
import { Badge, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

const SidebarItem = ({ item, open }) => {
  const { notificationCount } = useSelector((state) => state.auth.user);

  const isNotificationItem = item.label === 'Notifications';

  return (
    <Tooltip
      title={!open ? <span style={{ fontSize: '1rem' }}>{item.label}</span> : ''}
      placement="right"
      arrow
    >
      <ListItem
        button="true"
        onClick={item.onClick}
        sx={{
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          minHeight: 56,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'inherit',
          }}
        >
          {isNotificationItem && notificationCount > 0 ? (
            <Badge
              badgeContent={notificationCount}
              color="error"
              max={99}
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiBadge-badge': {
                  right: 2,
                  top: 2,
                  fontSize: '0.75rem',
                  minWidth: '18px',
                  height: '18px',
                  fontWeight: 'bold',
                },
              }}
            >
              {item.icon}
            </Badge>
          ) : (
            item.icon
          )}
        </ListItemIcon>
        {open && <ListItemText primary={item.label} />}
      </ListItem>
    </Tooltip>
  );
};

export default SidebarItem;
