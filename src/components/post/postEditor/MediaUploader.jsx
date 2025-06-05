import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineRemoveCircle } from 'react-icons/md';

const MediaUploader = ({ media, onDrop, removeMedia }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'video/*': ['.mp4', '.webm'],
    },
    maxFiles: 4 - media.length,
  });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.400',
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'grey.100' : 'transparent',
          mb: 2,
        }}
      >
        <input {...getInputProps()} />
        <Typography>Drag & drop images or video, or click to select</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {media.map((file, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            {file.type.startsWith('image') ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                controls
              />
            )}
            <IconButton
              size="small"
              color="error"
              onClick={() => removeMedia(index)}
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              <MdOutlineRemoveCircle />
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MediaUploader;
