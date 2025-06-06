import { Box, Button, CircularProgress, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import useMediaHandler from '../../../hooks/post/useMediaHandler';
import useEditors from '../../../hooks/post/useEditors';
import { useCreatePost } from '../../../hooks/post/useCreatePost';
import useSearchUsers from '../../../hooks/useSearchUsers';
import { toast } from 'react-toastify';
import Editor from './Editor';
import TagUserSelect from './TagUserSelect';
import MediaUploader from './MediaUploader';
import useHashtagSuggestions from '../../../hooks/post/useHashtagSuggestions';
import HashTagSelect from './HashTagSelect';

const PostEditor = ({ onSuccess }) => {
  const [visibility, setVisibility] = useState('PUBLIC');
  const { media, setMedia, onDrop, removeMedia } = useMediaHandler();
  const editor = useEditors();
  const { mutate: createPost, isLoading } = useCreatePost();
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagQuery, setHashtagQuery] = useState('');

  const { setSearchQuery, users, isLoading: usersLoading } = useSearchUsers();

  const { suggestions: hashtagSuggestion, isLoading: hashtagsLoading } =
    useHashtagSuggestions(hashtagQuery);

  const handleSubmit = () => {
    if (!editor?.getHTML()) {
      toast.error('Content is required');
      return;
    }

    createPost(
      {
        content: editor.getHTML(),
        visibility,
        media,
        taggedUserIds: taggedUsers.map((user) => user.id),
        hashtags: hashtags.map((h) => h.tag),
      },
      {
        onSuccess: () => {
          editor.commands.clearContent();
          setTaggedUsers([]);
          setHashtags([]);
          setVisibility('PUBLIC');
          setMedia([]);
          if (onSuccess) {
            onSuccess();
          }
        },
      },
    );
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Editor editor={editor} />
      <HashTagSelect
        hashtagSuggestions={hashtagSuggestion}
        hashtagsLoading={hashtagsLoading}
        hashtags={hashtags}
        setHashtags={setHashtags}
        setHashtagQuery={setHashtagQuery}
      />
      <TagUserSelect
        users={users}
        loading={usersLoading}
        taggedUsers={taggedUsers}
        setTaggedUsers={setTaggedUsers}
        setSearchQuery={setSearchQuery}
      />
      <MediaUploader media={media} onDrop={onDrop} removeMedia={removeMedia} />
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
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Post'}
      </Button>
    </Box>
  );
};

export default PostEditor;
