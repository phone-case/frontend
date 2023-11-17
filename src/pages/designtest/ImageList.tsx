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
            <button onClick={() => handleMoveDown(index)} disabled={index === 0}>
              Up
            </button>
            <button onClick={() => handleMoveUp(index)} disabled={index === images.length - 1}>
              Down
            </button>
            <button onClick={() => handleDelete(image.id)} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
