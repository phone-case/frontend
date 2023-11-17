// ImageList.tsx
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './ImageList.module.css';

interface ImageListProps {
  images: { id: number; src: string; alt: string }[];
  onImageOrderChange: (dragIndex: number, hoverIndex: number) => void;
  onDeleteImage: (id: number) => void; // Added this line
}

const DraggableImage: React.FC<{
  id: number;
  src: string;
  alt: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void; // Added this line
}> = ({ id, src, alt, index, moveImage, onDelete }) => {
  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (item: any) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={styles.draggableImage}>
      <img src={src} alt={alt} />
      <button onClick={onDelete} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

const ImageList: React.FC<ImageListProps> = ({ images, onImageOrderChange, onDeleteImage }) => {
  const moveImage = (dragIndex: number, hoverIndex: number) => {
    onImageOrderChange(dragIndex, hoverIndex);
  };

  const handleDelete = (id: number) => {
    onDeleteImage(id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.imageList}>
        <h2>Image List</h2>
        <div className={styles.draggableContainer}>
          {images.map((image, index) => (
            <DraggableImage
              key={image.id}
              id={image.id}
              src={image.src}
              alt={image.alt}
              index={index}
              moveImage={moveImage}
              onDelete={() => handleDelete(image.id)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default ImageList;
