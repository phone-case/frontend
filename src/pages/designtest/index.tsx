// App.tsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableResizableImage from './DraggableResizableImage';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import styles from './App.module.css';

interface ImageProps {
  id: number;
  src: string;
  alt: string;
  zIndex: number;
  width: number;
  height: number;
  position?: { x: number; y: number };
}

const App: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [showHandles, setShowHandles] = useState(true);

  const handleImageUpload = (newImages: File[]) => {
    const updatedImages = newImages.map((file, index) => ({
      id: images.length + index + 1,
      src: URL.createObjectURL(file),
      alt: file.name,
      zIndex: images.length + index + 1,
      width: 200,
      height: 150,
    }));
    setImages((prevImages) => [...prevImages, ...updatedImages]);
  };

  const handleImageMove = (id: number, newPosition: { x: number; y: number }) => {
    const newImages = [...images];
    const index = newImages.findIndex((image) => image.id === id);

    if (index !== -1) {
      newImages[index] = { ...newImages[index], position: newPosition };
      setImages(newImages);
    }
  };

  const handleImageResize = (id: number, width: number, height: number) => {
    const newImages = images.map((image) => (image.id === id ? { ...image, width, height } : image));
    setImages(newImages);
  };

  const handleImageOrderChange = (dragIndex: number, hoverIndex: number) => {
    const draggedImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  const handleDeleteImage = (id: number) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
  };

  const toggleHandles = () => {
    setShowHandles(!showHandles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <button onClick={toggleHandles}>Toggle Handles</button>
      </div>
      <ImageUploader onImageUpload={handleImageUpload} />
      <div className={styles.app}>
        {images.map((image) => (
          <DraggableResizableImage
            key={image.id}
            id={image.id}
            src={image.src}
            alt={image.alt}
            zIndex={image.zIndex}
            width={image.width}
            height={image.height}
            position={image.position}
            onImageMove={handleImageMove}
            onImageResize={handleImageResize}
            showHandles={showHandles}
          />
        ))}
      </div>
      <ImageList
        images={images.map((image) => ({ id: image.id, src: image.src, alt: image.alt }))}
        onImageOrderChange={handleImageOrderChange}
        onDeleteImage={handleDeleteImage} // Pass the function here
      />
    </DndProvider>
  );
};

export default App;
