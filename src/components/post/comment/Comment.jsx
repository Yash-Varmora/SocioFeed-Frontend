import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useComment from '../../../hooks/post/useComment';
import useInfiniteComments from '../../../hooks/post/useInfiniteComments';
import { useInView } from 'react-intersection-observer';
import { Avatar, Box, Button, CircularProgress, Typography, Stack } from '@mui/material';
import { AVATAR_URL } from '../../../constants';
import { formatDistanceToNow } from 'date-fns';
import CommentContent from './CommentContent';
import CommentActions from './CommentActions';
import CommentInput from './CommentInput';

const Comment = ({ comment, postId, level = 0 }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const {
    deleteComment,
    editComment,
    likeComment,
    unlikeComment,
    isLoading: isCommentActionLoading,
  } = useComment(postId, comment.parentCommentId);

  const {
    comments: replies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments(postId, comment.id);

  const { ref, inView } = useInView();

  const isOwnComment = currentUser?.id === comment.userId;
  const isLiked =
    comment.isLiked || comment.commentLikes?.some((like) => like.userId === currentUser?.id);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && showReplies) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, showReplies]);

  const handleLikeToggle = () => {
    isLiked ? unlikeComment(comment.id) : likeComment(comment.id);
  };

  const handleEdit = () => {
    editComment({ id: comment.id, content: editContent });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteComment({ id: comment.id });
  };

  return (
    <Box
      sx={{
        pl: Math.min(4, level * 2),
        pr: 1,
        pt: 2,
        pb: 1.5,
        borderRadius: 2,
        bgcolor: isOwnComment ? 'grey.100' : 'white',
        boxShadow: isOwnComment ? 1 : 0,
        mb: 1.5,
        borderLeft: level > 0 ? '2px solid #ddd' : 'none',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" mb={1} ml={1}>
        <Avatar
          src={comment.user.avatarUrl || AVATAR_URL}
          sx={{ width: 32, height: 32, cursor: 'pointer' }}
          onClick={() => navigate(`/profile/${comment.user.username}`)}
        />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={() => navigate(`/profile/${comment.user.username}`)}
          >
            {comment.user.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Stack>

      <CommentContent
        comment={comment}
        isEditing={isEditing}
        editContent={editContent}
        setEditContent={setEditContent}
        handleEdit={handleEdit}
        setIsEditing={setIsEditing}
        postId={postId}
      />

      <CommentActions
        comment={comment}
        isOwnComment={isOwnComment}
        isLiked={isLiked}
        handleLikeToggle={handleLikeToggle}
        handleDelete={handleDelete}
        setIsEditing={setIsEditing}
        setShowReplyInput={setShowReplyInput}
        showReplyInput={showReplyInput}
        isLoading={isCommentActionLoading}
      />

      {showReplyInput && (
        <Box sx={{ mt: 1 }}>
          <CommentInput
            postId={postId}
            parentCommentId={comment.id}
            onSubmit={() => setShowReplies(true)}
            onCancel={() => setShowReplyInput(false)}
          />
        </Box>
      )}

      {comment?.childComments?.length > 0 && (
        <Button
          size="small"
          variant="text"
          color="primary"
          onClick={() => setShowReplies(!showReplies)}
          sx={{ textTransform: 'none', mt: 1 }}
        >
          {showReplies
            ? 'Hide Replies'
            : `Show ${comment.childComments.length} repl${comment.childComments.length > 1 ? 'ies' : 'y'}`}
        </Button>
      )}

      {showReplies && (
        <Box sx={{ mt: 2 }}>
          {isLoading && (
            <Box sx={{ textAlign: 'center', my: 2 }}>
              <CircularProgress size={20} />
            </Box>
          )}
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} postId={postId} level={level + 1} />
          ))}
          <Box ref={ref} sx={{ textAlign: 'center', mt: 1 }}>
            {isFetchingNextPage && <CircularProgress size={20} />}
            {!hasNextPage && replies.length > 0 && (
              <Typography variant="caption" color="text.secondary">
                No more replies
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Comment;
