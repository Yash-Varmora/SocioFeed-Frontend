import { Tab, Tabs } from '@mui/material';
import React from 'react';

const CustomTabs = ({ tab, setTab, isOwnProfile }) => {
  return (
    <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
      <Tab label="Followers" value="followers" />
      <Tab label="Following" value="following" />
      {!isOwnProfile && <Tab label="Mutual Friends" value="mutualFriends" />}
    </Tabs>
  );
};

export default CustomTabs;
