import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import UserInfo from './UserInfo';
import TaggedUsers from './TaggedUsers';
import HashtagList from './HashtagList';
import PostMedia from './PostMedia';
import ActionButtons from './ActionButtons';
import { useSelector } from 'react-redux';
import { useDeletePost } from '../../hooks/post/useDelete';
import { useNavigate } from 'react-router-dom';
import useLike from '../../hooks/post/useLike';
import useSave from '../../hooks/post/useSave';
import LikeModel from './LikeModel';

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  const [openDialog, setOpenDialog] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const { like, unlike } = useLike(post?.id);
  const { savePost, unsavePost } = useSave(post?.id);
  const [openLikesModal, setOpenLikesModal] = useState(false);

  const sanitizeContent = (content) => {
    if (!content) {
      return '';
    }
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'p',
        'b',
        'i',
        'u',
        'h1',
        'h2',
        'h3',
        'ul',
        'ol',
        'li',
        'span',
        'strong',
        'em',
        'br',
      ],
      ALLOWED_ATTR: ['class'],
    });
  };

  const sanitizedContent = sanitizeContent(post?.content);

  useEffect(() => {
    const el = contentRef.current;
    if (el && !isExpanded) {
      const isClamped = el.scrollHeight > el.clientHeight + 1;
      setIsOverflowing(isClamped);
    }
  }, [sanitizedContent, isExpanded]);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleDelete = () => {
    deletePost(post.id);
    setOpenDialog(false);
  };

  const handleLikeToggle = () => {
    if (post.isLike) {
      unlike();
    } else {
      like();
    }
  };

  const handleSaveToggle = () => {
    if (post.isSaved) {
      unsavePost();
    } else {
      savePost();
    }
  };

  const isOwner = currentUser?.id === post?.user.id;
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        mb: 4,
        '& h1': { fontSize: '2rem', fontWeight: 700, margin: '1em 0 0.5em' },
        '& h2': { fontSize: '1.5rem', fontWeight: 600, margin: '1em 0 0.5em' },
        '& h3': { fontSize: '1.25rem', fontWeight: 600, margin: '1em 0 0.5em' },
        '& ul': { listStyleType: 'disc', paddingLeft: '2rem', margin: '1em 0' },
        '& ol': { listStyleType: 'decimal', paddingLeft: '2rem', margin: '1em 0' },
        '& li': { marginBottom: '0.5em', lineHeight: 1.6 },
        '& li p': { margin: 0 },
        '& b, & strong': { fontWeight: 700 },
        '& i, & em': { fontStyle: 'italic' },
        '& u': { textDecoration: 'underline' },
        '& p': { margin: '0.5em 0' },
        '& br': { display: 'block', content: '""', margin: '0.5em 0' },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <UserInfo user={post?.user} createdAt={post?.createdAt} visibility={post?.visibility} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isOwner && (
            <>
              <Button variant="outlined" onClick={() => navigate(`/post/${post.id}/edit`)}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenDialog(true)}
                disabled={isDeleting}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box
        ref={contentRef}
        sx={{
          mb: 2,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: isExpanded ? 'unset' : 5,
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {isOverflowing && (
        <Button onClick={handleToggle} sx={{ mb: 2, textTransform: 'none', color: 'primary.main' }}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      )}

      {post?.tagsInPosts?.length > 0 && <TaggedUsers tags={post?.tagsInPosts} />}
      {post?.postHashtags?.length > 0 && <HashtagList hashtags={post?.postHashtags} />}
      {post?.postMedia.length > 0 && <PostMedia media={post?.postMedia} />}
      <ActionButtons
        likeCount={post?.likeCount}
        commentCount={post?.commentCount}
        isLiked={post?.isLike}
        isPostSaved={post?.isSaved}
        onLikeClick={handleLikeToggle}
        onSavePostClick={handleSaveToggle}
        openLikesModal={setOpenLikesModal}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <LikeModel open={openLikesModal} onClose={() => setOpenLikesModal(false)} postId={post?.id} />
    </Box>
  );
};

export default Post;
