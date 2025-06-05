import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Box, Button } from '@mui/material';
import UserInfo from './UserInfo';
import TaggedUsers from './TaggedUsers';
import HashtagList from './HashtagList';
import PostMedia from './PostMedia';
import ActionButtons from './ActionButtons';

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

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
      const isClamped = el.scrollHeight > el.clientHeight + 1; // +1 for precision buffer
      setIsOverflowing(isClamped);
    }
  }, [sanitizedContent, isExpanded]);

  const handleToggle = () => setIsExpanded(!isExpanded);

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
      <UserInfo user={post?.user} createdAt={post?.createdAt} visibility={post?.visibility} />

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
      {post?.postHashtags?.length > 0 && <HashtagList hashtags={post.postHashtags} />}
      {post?.postMedia.length > 0 && <PostMedia media={post?.postMedia} />}
      <ActionButtons likeCount={post?.likeCount} commentCount={post?.commentCount} />
    </Box>
  );
};

export default Post;
