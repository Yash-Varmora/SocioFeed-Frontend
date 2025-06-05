import { Box } from '@mui/material';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PostMedia = ({ media }) => {
  const sortedMedia = media.sort((a, b) => a.order - b.order);

  if (media.length === 1) {
    const file = media[0];
    return (
      <Box sx={{ mb: 2 }}>
        {file.mediaType === 'video' ? (
          <video src={file.mediaUrl} controls style={{ width: '100%', maxHeight: '400px' }} />
        ) : (
          <img
            src={file.mediaUrl}
            alt="Post media"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
      </Box>
    );
  }
  return (
    <Box sx={{ mb: 2 }}>
      <Carousel showThumbs={false} showStatus={false}>
        {sortedMedia.map((file) => (
          <div key={file.id}>
            {file.mediaType === 'video' ? (
              <video src={file.mediaUrl} controls style={{ width: '100%', maxHeight: '400px' }} />
            ) : (
              <img
                src={file.mediaUrl}
                alt="Post media"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default PostMedia;
