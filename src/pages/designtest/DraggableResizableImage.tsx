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
  className?: string;
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
  showHandles,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const containerCenterX = window.innerWidth / 7;
  const containerCenterY = window.innerHeight / 4;

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
      position={position || { x: containerCenterX, y:  containerCenterY}}
      cancel=".react-resizable-handle"
      scale={1}
    >
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[50, 50]}
        onResize={handleResize}
        resizeHandles={showHandles ? ['se', 'sw', 'ne', 'nw', 'e', 'n', 's', 'w']:[]}
        draggableOpts={{ grid: [1, 1] }}
        className={styles.draggableResizableImage}
      >
        <img src={src} alt={alt} className={styles.resizableBox} />
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableResizableImage;
