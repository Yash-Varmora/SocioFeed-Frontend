import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useComment from '../../../hooks/post/useComment';
import useInfiniteComments from '../../../hooks/post/useInfiniteComments';
import { useInView } from 'react-intersection-observer';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteComment({ id: comment.id });
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box
      sx={{
        pl: 3,
        pr: 1,
        pt: 2,
        pb: 1.5,
        bgcolor: isOwnComment ? 'grey.100' : 'white',
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
        handleDelete={handleDeleteClick}
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
            onSubmit={() => {
              setShowReplies(true);
              setShowReplyInput(false);
            }}
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
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this comment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isCommentActionLoading}
          >
            {isCommentActionLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Comment;
