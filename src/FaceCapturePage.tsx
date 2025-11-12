import type { CallbackImage } from '@innovatrics/dot-document-auto-capture';
import type { FaceCallback } from '@innovatrics/dot-face-auto-capture';

import { useState, useCallback } from 'react';

import FaceAutoCapture from './components/FaceAutoCapture';
import PhotoResult from './components/PhotoResult';
import styles from './styles/index.module.css';

function FaceCapturePage() {
  const [photoUrl, setPhotoUrl] = useState<string>();

  const handlePhotoTaken: FaceCallback = (imageData, _content) => {
    const imageUrl = URL.createObjectURL(imageData.image);
    setPhotoUrl(imageUrl);
  };

  const handleError = useCallback((error: Error) => {
    alert(error.message);
  }, []);

  const handleBackClick = () => {
    setPhotoUrl(undefined);
  };

  return (
    <div className={styles.app}>
      <h1>Face Auto Capture</h1>

      {!photoUrl ? (
        <FaceAutoCapture
          onBackClick={handleBackClick}
          onError={handleError}
          onPhotoTaken={handlePhotoTaken}
        />
      ) : (
        <PhotoResult photoUrl={photoUrl} />
      )}
    </div>
  );
}

export default FaceCapturePage;
