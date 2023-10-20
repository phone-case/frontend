import React, { useState, ChangeEvent } from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import './style.css';


function Design() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  const handleDrag = (e: any, data: any) => {
    if (!isResizing) {
      setPosition({ x: data.x, y: data.y });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className="design-mid">
        <div className='design-box'>
          <div className='design-img-box'>
            {selectedImage ? (
              <Draggable bounds="parent" onDrag={handleDrag}>
                <Resizable
                  size={{ width: 200, height: 200 }}
                  enable={{
                    top: false, right: true, bottom: false, left: false,
                    topRight: false, bottomRight: true, bottomLeft: false, topLeft: false,
                  }}
                >
                  <div className="select-img">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="선택한 그림"
                    />
                    <div className="drag-handle"/>
                  </div>
                </Resizable>
              </Draggable>
                ) : null}
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Design;
