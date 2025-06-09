import React, { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import usePostById from '../../hooks/post/usePostById';
import useInfiniteComments from '../../hooks/post/useInfiniteComments';
import { useInView } from 'react-intersection-observer';
import { Box, CircularProgress, Typography } from '@mui/material';
import Comment from '../../components/post/comment/Comment';
import CommentInput from '../../components/post/comment/CommentInput';
import Post from '../../components/post/Post';

const PostDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { post, isLoading: postLoading } = usePostById(id);
  const {
    comments,
    isLoading: commentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments(id, null);
  const commentInputRef = useRef(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (location.state?.focusCommentInput && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [location.state]);

  if (postLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  }

  if (!post) {
    return <Typography sx={{ textAlign: 'center', my: 4 }}>Post not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '2xl', mx: 'auto', p: 4 }}>
      <Post post={post} />
      <Typography variant="h6" sx={{ my: 2 }}>
        Comments
      </Typography>
      <CommentInput
        postId={id}
        autoFocus={location.state?.focusCommentInput}
        ref={commentInputRef}
      />
      {commentsLoading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
      ) : comments.length === 0 ? (
        <Typography sx={{ my: 2 }}>No comments yet</Typography>
      ) : (
        <>
          {comments.map((comment) => (
            <Comment key={comment?.id} comment={comment} postId={id} />
          ))}
          <Box ref={ref} sx={{ textAlign: 'center', my: 2 }}>
            {isFetchingNextPage && <CircularProgress size={24} />}
            {!hasNextPage && comments.length > 0 && (
              <Typography color="text.secondary">No more comments to load</Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default PostDetail;
