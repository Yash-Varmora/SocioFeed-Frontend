import React from 'react';
import { AVATAR_URL } from '../../constants';

const ProfileHeader = ({ avatarUrl, username, email, bio, followers, following }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={avatarUrl || AVATAR_URL}
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold">{username}</h1>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-600">{bio || 'No bio yet'}</p>
        <p className="text-gray-600">
          Followers: {followers} | Following: {following}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
