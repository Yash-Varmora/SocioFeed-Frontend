import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '../services/followService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function useFollow(followedId, username, currentProfileUsername) {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.setQueryData(['profile', username], (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          totalFollowers: oldData.totalFollowers + 1,
          followsFollowing: [...(oldData.followsFollowing || []), { followerId: user.id }],
        };
      });

      queryClient.setQueryData(['profile', user.username], (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          totalFollowing: oldData.totalFollowing + 1,
        };
      });

      queryClient.setQueriesData({ queryKey: ['followers'] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            followers: page.followers.map((follower) => {
              if (follower.id === followedId) {
                return {
                  ...follower,
                  followsFollowing: [...(follower.followsFollowing || []), { followerId: user.id }],
                };
              }
              return follower;
            }),
          })),
        };
      });

      queryClient.setQueriesData({ queryKey: ['following'] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            following: page.following.map((followedUser) => {
              if (followedUser.id === followedId) {
                return {
                  ...followedUser,
                  followsFollowing: [
                    ...(followedUser.followsFollowing || []),
                    { followerId: user.id },
                  ],
                };
              }
              return followedUser;
            }),
          })),
        };
      });

      queryClient.setQueriesData({ queryKey: ['followers', username] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                total: page.total + 1,
              };
            }
            return page;
          }),
        };
      });

      queryClient.setQueriesData({ queryKey: ['mutualFriends'] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            mutualFriends: page.mutualFriends.map((friend) => {
              if (friend.id === followedId) {
                return {
                  ...friend,
                  followsFollowing: [...(friend.followsFollowing || []), { followerId: user.id }],
                };
              }
              return friend;
            }),
          })),
        };
      });

      if (user.username !== currentProfileUsername) {
        queryClient.invalidateQueries({ queryKey: ['followers', user.username] });
        queryClient.invalidateQueries({ queryKey: ['following', user.username] });
        queryClient.invalidateQueries({ queryKey: ['mutualFriends', user.username] });
      }
      queryClient.invalidateQueries({ queryKey: ['profile', user.username] });

      toast.success('Followed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to follow user');
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.setQueryData(['profile', username], (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          totalFollowers: Math.max(0, oldData.totalFollowers - 1),
          followsFollowing: (oldData.followsFollowing || []).filter(
            (f) => f.followerId !== user.id,
          ),
        };
      });

      queryClient.setQueryData(['profile', user.username], (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          totalFollowing: Math.max(0, oldData.totalFollowing - 1),
        };
      });

      queryClient.setQueriesData({ queryKey: ['followers', username] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                total: Math.max(0, page.total - 1),
              };
            }
            return page;
          }),
        };
      });

      queryClient.setQueriesData({ queryKey: ['following'] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            following: page.following.map((followedUser) => {
              if (followedUser.id === followedId) {
                return {
                  ...followedUser,
                  followsFollowing: (followedUser.followsFollowing || []).filter(
                    (f) => f.followerId !== user.id,
                  ),
                };
              }
              return followedUser;
            }),
          })),
        };
      });

      queryClient.setQueriesData({ queryKey: ['followers'] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            followers: page.followers.map((follower) => {
              if (follower.id === followedId) {
                return {
                  ...follower,
                  followsFollowing: (follower.followsFollowing || []).filter(
                    (f) => f.followerId !== user.id,
                  ),
                };
              }
              return follower;
            }),
          })),
        };
      });

      queryClient.setQueriesData({ queryKey: ['mutualFriends'] }, (oldData) => {
        if (!oldData) {
          return oldData;
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            mutualFriends: page.mutualFriends.map((friend) => {
              if (friend.id === followedId) {
                return {
                  ...friend,
                  followsFollowing: (friend.followsFollowing || []).filter(
                    (f) => f.followerId !== user.id,
                  ),
                };
              }
              return friend;
            }),
          })),
        };
      });

      if (user.username !== currentProfileUsername) {
        queryClient.invalidateQueries({ queryKey: ['following', user.username] });
      }
      queryClient.invalidateQueries({ queryKey: ['profile', user.username] });

      toast.success('Unfollowed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to unfollow user');
    },
  });

  return {
    follow: () => followMutation.mutate(followedId),
    unfollow: () => unfollowMutation.mutate(followedId),
    isFollowing: followMutation.isPending || unfollowMutation.isPending,
  };
}

export default useFollow;
