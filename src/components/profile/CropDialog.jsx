import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import Cropper from 'react-easy-crop';

const CropDialog = ({
  open,
  onClose,
  imageSrc,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  onUpload,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <div className="relative h-96">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onUpload} color="primary">
          Crop & Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropDialog;
