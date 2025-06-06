import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

function useMediaHandler() {
  const [media, setMedia] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const isVideo = acceptedFiles.some((file) => file.type.startsWith('video'));
      if (isVideo && acceptedFiles.length > 1) {
        toast.error('Only one video allowed');
        return;
      }
      if (acceptedFiles.length + media.length > 4) {
        toast.error('Maximum 4 images or 1 video allowed');
        return;
      }
      setMedia((prev) => [...prev, ...acceptedFiles]);
    },
    [media],
  );

  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  return { media, setMedia, onDrop, removeMedia };
}

export default useMediaHandler;
