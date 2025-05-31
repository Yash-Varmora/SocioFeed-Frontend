import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

const SidebarItem = ({ item, open }) => {
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
          {item.icon}
        </ListItemIcon>
        {open && <ListItemText primary={item.label} />}
      </ListItem>
    </Tooltip>
  );
};

export default SidebarItem;
