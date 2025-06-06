import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostEditor from '../../components/post/postEditor/PostEditor';

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: '2xl', mx: 'auto', p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Create Post
      </Typography>
      <PostEditor onSuccess={() => navigate('/')} />
      <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CreatePost;
