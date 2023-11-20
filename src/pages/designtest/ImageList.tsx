// ImageList.tsx
import React from 'react';
import styles from './ImageList.module.css';

interface ImageListProps {
  images: { id: number; src: string; alt: string }[];
  onImageOrderChange: (dragIndex: number, hoverIndex: number) => void;
  onDeleteImage: (id: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onImageOrderChange, onDeleteImage }) => {
  const moveImage = (dragIndex: number, hoverIndex: number) => {
    onImageOrderChange(dragIndex, hoverIndex);
  };

  const handleMoveUp = (index: number) => {
    const originalIndex = images.length - 1 - index; // Calculate the original index
    if (originalIndex > 0) {
      moveImage(originalIndex, originalIndex - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    const originalIndex = images.length - 1 - index; // Calculate the original index
    if (originalIndex < images.length - 1) {
      moveImage(originalIndex, originalIndex + 1);
    }
  };

  const handleDelete = (id: number) => {
    onDeleteImage(id);
  };

  return (
    <div className={styles.imageList}>
      <h2>Image List</h2>
      <div className={styles.draggableContainer}>
        {images.slice().reverse().map((image, index) => (
          <div key={image.id} className={styles.draggableImage}>
            <img src={image.src} alt={image.alt} />
            <br/>
            <button className={styles.button1} onClick={() => handleMoveDown(index)} disabled={index === 0}>
              <img src='/img/u.png' alt='sam'
              style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
            </button>
            <button className={styles.button1} onClick={() => handleMoveUp(index)} disabled={index === images.length - 1}>
              <img src='/img/d.png' alt='sam'
              style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
            </button>
            <button className={styles.button1} onClick={() => handleDelete(image.id)}>
              <img src='/img/del.png' alt='sam'
              style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
