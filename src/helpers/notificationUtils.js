export const getNotificationMessage = (notification) => {
  const actorName = notification.actor.username;

  switch (notification.type) {
    case 'FOLLOW':
      return `${actorName} started following you`;

    case 'POST_LIKE':
      return `${actorName} liked your post`;

    case 'POST_COMMENT':
      return `${actorName} commented on your post`;

    case 'COMMENT_LIKE':
      return `${actorName} liked your comment`;

    case 'TAG_IN_POST':
      return `${actorName} tagged you in a post`;

    case 'TAG_IN_COMMENT':
      return `${actorName} tagged you in a comment`;

    case 'GROUP_MESSAGE':
      return `${actorName} sent a message in group`;

    case 'DIRECT_MESSAGE':
      return `${actorName} sent you a direct message`;

    case 'GROUP_INVITE':
      return `${actorName} invited you to join a group`;

    case 'GROUP_MEMBER_JOINED':
      return `${actorName} joined your group`;

    default:
      return `${actorName} interacted with your content`;
  }
};
