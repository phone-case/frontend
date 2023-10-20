import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';


function ResizableAndDraggable() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 200 });

  return (
    <Draggable position={position} onStop={(e, data) => setPosition({ x: data.x, y: data.y })}>
      <Resizable
        size={size}
        onResize={(e, direction, ref, d) => {
          setSize({
            width: size.width + d.width,
            height: size.height + d.height,
          });
        }}
      >
        <div style={{ border: '1px solid #000', width: '100%', height: '100%' }}>
          Resizable and Draggable Content
        </div>
      </Resizable>
    </Draggable>
  );
}

export default ResizableAndDraggable;
