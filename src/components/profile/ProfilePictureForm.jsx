import React from 'react';
import { Button, LinearProgress } from '@mui/material';

const ProfilePictureForm = ({
  getRootProps,
  getInputProps,
  isDragActive,
  uploadProgress,
  croppedImageSrc,
  onSave,
  isUploading,
}) => {
  return (
    <div className="mt-4 space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <input {...getInputProps({ accept: 'image/*' })} />
        <p>Drag & drop an image here, or click to select</p>
      </div>
      {croppedImageSrc && (
        <div className="mt-4">
          <p className="text-gray-600 mb-2">Cropped Image Preview:</p>
          <img src={croppedImageSrc} alt="Cropped Preview" className="max-w-xs mx-auto rounded" />
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            className="mt-2"
            disabled={isUploading || uploadProgress > 0}
          >
            Save Image
          </Button>
        </div>
      )}
      {uploadProgress > 0 && (
        <LinearProgress variant="determinate" value={uploadProgress} className="mt-2" />
      )}
    </div>
  );
};

export default ProfilePictureForm;
