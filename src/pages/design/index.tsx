import React, { useState, ChangeEvent } from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import './style.css';


function Design() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 }); // 초기 크기 설정


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

  const handleResize = (e: Event, direction: string, ref: HTMLElement, d: { width: number, height: number }) => {
    // 이미지 크기 조절 로직
    setImageSize({ width: imageSize.width + d.width, height: imageSize.height + d.height });
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
