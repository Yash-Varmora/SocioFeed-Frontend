import React, { useEffect, useState } from 'react';
import useFollowers from '../../hooks/useFollowers';
import useFollowing from '../../hooks/useFollowing';
import useMutualFriends from '../../hooks/useMutualFriends';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTabs from './CustomTabs';

const Modal = ({ open, onClose, username, initialTab, isOwnProfile }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    }
  }, [initialTab]);

  const followersData = useFollowers(username);
  const followingData = useFollowing(username);
  const mutualFriendsData = useMutualFriends(username, isOwnProfile);

  if (mutualFriendsData.error) {
    toast.error(mutualFriendsData.error.response?.data?.error || 'Failed to fetch mutual friends');
  }

  const getTabData = () => {
    switch (tab) {
      case 'followers':
        return { ...followersData, type: 'followers' };
      case 'following':
        return { ...followingData, type: 'following' };
      case 'mutualFriends':
        return { ...mutualFriendsData, type: 'mutualFriends' };
      default:
        return { ...followersData, type: 'followers' };
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Friends</DialogTitle>
      <CustomTabs tab={tab} setTab={setTab} isOwnProfile={isOwnProfile} />
      <DialogContent>
        <UserList
          {...getTabData()}
          isOwnProfile={isOwnProfile}
          onUserClick={(username) => {
            onClose();
            navigate(`/profile/${username}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
