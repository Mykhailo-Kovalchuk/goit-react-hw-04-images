import React from 'react';
import css from './imageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';

const ImageGallery = ({ picturesQuery, handleShowImageId }) => {
  return (
    <div className={css.ImageGallery}>
      <ImageGalleryItem
        picturesQuery={picturesQuery}
        handleShowImageId={handleShowImageId}
      />
    </div>
  );
};

export { ImageGallery };
