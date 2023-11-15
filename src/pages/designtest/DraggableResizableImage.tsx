// DraggableResizableImage.tsx
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import styles from './DraggableResizableImage.module.css';

interface DraggableResizableImageProps {
  id: number;
  src: string;
  alt: string;
  zIndex: number;
  width: number;
  height: number;
  position?: { x: number; y: number };
  onImageMove: (id: number, newPosition: { x: number; y: number }) => void;
  onImageResize: (id: number, width: number, height: number) => void;
  showHandles: boolean; // Added this line
}

const DraggableResizableImage: React.FC<DraggableResizableImageProps> = ({
  id,
  src,
  alt,
  zIndex,
  width,
  height,
  position,
  onImageMove,
  onImageResize,
  showHandles, // Added this line
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleStart = (e: any, data: any) => {
    if (data.handle === 'se') {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
  };

  const handleStop = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleDrag = (e: any, ui: any) => {
    if (!isResizing) {
      onImageMove(id, { x: ui.x, y: ui.y });
    }
  };

  const handleResize = (event: any, { size }: any) => {
    onImageResize(id, size.width, size.height);
  };

  return (
    <Draggable
      onStart={handleStart}
      onStop={handleStop}
      onDrag={handleDrag}
      position={position || { x: 0, y: 0 }}
      cancel=".react-resizable-handle"
      scale={1}
    >
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[50, 50]}
        maxConstraints={[window.innerWidth * 0.8, window.innerHeight * 0.8]}
        onResize={handleResize}
        resizeHandles={showHandles ? ['se', 'sw', 'ne', 'nw', 'e', 'n', 's', 'w'] : []}
        draggableOpts={{ grid: [1, 1] }}
        className={styles.draggableResizableImage}
      >
        <img src={src} alt={alt} className={styles.resizableBox} />
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableResizableImage;
