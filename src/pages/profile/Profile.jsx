import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfileData } from '../../hooks/profile/useProfileData';
import { useAvatarUpload } from '../../hooks/profile/useAvatarUpload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../schemas/profileSchema';
import { useDropzone } from 'react-dropzone';
import ProfileHeader from '../../components/profile/ProfileHeader';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import ProfileForm from '../../components/profile/ProfileForm';
import CropDialog from '../../components/profile/CropDialog';
import { toast } from 'react-toastify';
import ProfilePictureForm from '../../components/profile/ProfilePictureForm';
import useMutualFriends from '../../hooks/profile/useMutualFriends';
import useFollow from '../../hooks/useFollow';
import Modal from '../../components/follow/Modal';
import { AVATAR_URL } from '../../constants';
import Post from '../../components/post/Post';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isOwnProfile = user?.username === username;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [socialModalTab, setSocialModalTab] = useState('followers');

  const { profile, isLoading, error, updateMutation, userPosts, postsLoading } = useProfileData(
    username,
    navigate,
  );
  const { uploadMutation, uploadProgress } = useAvatarUpload(username, () =>
    setIsEditingPicture(false),
  );

  const { mutualFriends, isLoading: mutualFriendsLoading } = useMutualFriends(
    username,
    isOwnProfile,
  );
  const { follow, unfollow, isFollowing } = useFollow(profile?.id, username);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: { username: '', bio: '' },
  });

  useEffect(() => {
    if (profile) {
      reset({ username: profile.username, bio: profile.bio });
    }
  }, [profile, reset]);

  const onDrop = useCallback((files) => {
    const file = files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
    setOpenCropDialog(true);
  }, []);

  const onDropRejected = (fileRejections) => {
    fileRejections.forEach(({ errors }) => {
      errors.forEach((error) => toast.error(error.message));
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
  });

  const onCropComplete = useCallback((_, pixels) => setCroppedAreaPixels(pixels), []);

  const handleCrop = async () => {
    const { getCroppedImg } = await import('../../helpers/imageCrop');
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const reader = new FileReader();
    reader.onload = () => setCroppedImageSrc(reader.result);
    reader.readAsDataURL(blob);
    setOpenCropDialog(false);
  };

  const handleSaveCroppedImage = async () => {
    const { getCroppedImg } = await import('../../helpers/imageCrop');
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const formData = new FormData();
    formData.append('avatar', blob, 'avatar.jpg');
    uploadMutation.mutate({ formData });
  };

  const handleFormSubmit = handleSubmit((data) => {
    updateMutation.mutate(data);
    setIsEditingProfile(false);
  });

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }
  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-8">Profile not found</div>;
  }

  const handleMutualFriendClick = (friendUsername) => {
    navigate(`/profile/${friendUsername}`);
  };

  const openSocialModal = (tab) => {
    setSocialModalTab(tab);
    setSocialModalOpen(true);
  };

  const isFollowingUser = profile.followsFollowing?.some((f) => f.followerId === user?.id);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <ProfileHeader
          avatarUrl={profile.avatarUrl}
          username={profile.username}
          email={profile.email}
          bio={profile.bio}
          followers={profile.totalFollowers}
          following={profile.totalFollowing}
          post={userPosts?.length || 0}
          openModal={(tab) => openSocialModal(tab)}
        />
        {!isOwnProfile && (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color={isFollowingUser ? 'secondary' : 'primary'}
              onClick={isFollowingUser ? unfollow : follow}
              disabled={isFollowing}
            >
              {isFollowing ? (
                <CircularProgress size={24} />
              ) : isFollowingUser ? (
                'Unfollow'
              ) : (
                'Follow'
              )}
            </Button>
          </Box>
        )}
        {isOwnProfile && (
          <div className="mt-4 space-x-2">
            <Button
              variant="contained"
              onClick={() => {
                setIsEditingProfile((prev) => !prev);
                setIsEditingPicture(false);
              }}
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setIsEditingPicture((prev) => !prev);
                setIsEditingProfile(false);
                setCroppedImageSrc(null);
              }}
            >
              {isEditingPicture ? 'Cancel' : 'Change Picture'}
            </Button>
          </div>
        )}
        {isEditingProfile && isOwnProfile && (
          <ProfileForm
            register={register}
            errors={errors}
            onSubmit={handleFormSubmit}
            isLoading={updateMutation.isLoading}
          />
        )}
        {!isOwnProfile && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Mutual Friends
            </Typography>
            {mutualFriendsLoading ? (
              <CircularProgress />
            ) : mutualFriends.length > 0 ? (
              <>
                <List>
                  {mutualFriends.slice(0, 2).map((friend) => (
                    <ListItem
                      key={friend.id}
                      button="true"
                      onClick={() => handleMutualFriendClick(friend.username)}
                    >
                      <ListItemAvatar>
                        <Avatar src={friend.avatarUrl || AVATAR_URL} alt={friend.username} />
                      </ListItemAvatar>
                      <ListItemText primary={friend.username} />
                    </ListItem>
                  ))}
                </List>
                {mutualFriends.length > 2 && (
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    and {mutualFriends.length - 2} others
                  </Typography>
                )}
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Button variant="contained" onClick={() => openSocialModal('mutualFriends')}>
                    view Mutual Friends
                  </Button>
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">No mutual friends</Typography>
            )}
          </Box>
        )}
        {isEditingPicture && isOwnProfile && (
          <ProfilePictureForm
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            uploadProgress={uploadProgress}
            croppedImageSrc={croppedImageSrc}
            onSave={handleSaveCroppedImage}
            isUploading={uploadMutation.isLoading}
          />
        )}
      </div>

      <Typography variant="h5" sx={{ my: 4 }}>
        Posts
      </Typography>
      {postsLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : userPosts?.length > 0 ? (
        userPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Typography>No posts yet</Typography>
      )}

      <CropDialog
        open={openCropDialog}
        onClose={() => setOpenCropDialog(false)}
        imageSrc={imageSrc}
        crop={crop}
        zoom={zoom}
        setCrop={setCrop}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        onUpload={handleCrop}
      />
      <Modal
        open={socialModalOpen}
        onClose={() => {
          setSocialModalOpen(false);
        }}
        username={username}
        initialTab={socialModalTab}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};

export default Profile;
