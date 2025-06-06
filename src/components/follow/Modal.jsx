import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import UserList from './UserList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTabs from './CustomTabs';
import { useQueryClient } from '@tanstack/react-query';
import useFollowers from '../../hooks/profile/useFollowers';
import useFollowing from '../../hooks/profile/useFollowing';
import useMutualFriends from '../../hooks/profile/useMutualFriends';

const Modal = ({ open, onClose, username, initialTab, isOwnProfile }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(initialTab);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
      setSearch('');
    }
  }, [initialTab, username]);

  const followersData = useFollowers(username);
  const followingData = useFollowing(username);
  const mutualFriendsData = useMutualFriends(username, isOwnProfile);

  if (mutualFriendsData.error) {
    toast.error(mutualFriendsData.error.response?.data?.error || 'Failed to fetch mutual friends');
  }

  const handleClose = () => {
    if (isOwnProfile) {
      queryClient.invalidateQueries({ queryKey: ['followers', username] });
      queryClient.invalidateQueries({ queryKey: ['following', username] });
    }
    onClose();
  };

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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Friends</DialogTitle>
      <CustomTabs tab={tab} setTab={setTab} isOwnProfile={isOwnProfile} />
      <DialogContent>
        <UserList
          {...getTabData()}
          currentProfileUsername={username}
          isOwnProfile={isOwnProfile}
          onUserClick={(username) => {
            onClose();
            navigate(`/profile/${username}`);
          }}
          search={search}
          setSearch={setSearch}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
