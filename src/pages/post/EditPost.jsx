import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdatePost } from '../../hooks/post/useUpdatePost';
import useEditors from '../../hooks/post/useEditors';
import { getPostById } from '../../services/postService';
import { toast } from 'react-toastify';
import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import Editor from '../../components/post/postEditor/Editor';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState('PUBLIC');
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: updatePost, isLoading: isUpdating } = useUpdatePost();

  const editor = useEditors();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        const post = response.data;
        editor?.commands.setContent(post.content);
        setVisibility(post.visibility);
        setIsLoading(false);
      } catch {
        toast.error('Failed to load post');
        navigate('/');
      }
    };
    fetchPost();
  }, [id, editor, navigate]);

  const handleSubmit = () => {
    if (!editor?.getHTML()) {
      toast.error('Content is required');
      return;
    }
    updatePost(
      {
        id: id,
        content: editor.getHTML(),
        visibility,
      },
      {
        onSuccess: () => navigate('/'),
      },
    );
  };

  if (!editor || isLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }
  return (
    <Box sx={{ maxWidth: '2xl', mx: 'auto', p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Edit Post
      </Typography>
      <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <Editor editor={editor} />
        <Select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="PUBLIC">Public</MenuItem>
          <MenuItem value="FRIENDS_ONLY">Friends Only</MenuItem>
          <MenuItem value="PRIVATE">Private</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isUpdating}
          sx={{ mr: 2 }}
        >
          {isUpdating ? <CircularProgress size={24} /> : 'Save'}
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditPost;
