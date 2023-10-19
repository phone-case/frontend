import React, { useState, ChangeEvent } from 'react';
import './style.css';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';

function Design() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [size, setSize] = useState({ width: 100, height: 100 }); // 초기 크기 설정


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  const handleResize = (
    e: React.SyntheticEvent,
    data: { size: { width: number; height: number } }
  ) => {
    // Handle resize here
  };

  const handleDrag = (
    e: Event,
    data: { x: number; y: number; deltaX: number; deltaY: number }
  ) => {
    // Handle drag here
  };

  
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
        <div className="design-mid">
          <div className="design-box">
            <div className="design-image-box">

              {selectedImage ? (
                <Draggable 
                bounds="parent"> 

                  <Resizable
                    width={size.width}
                    height={size.height}
                    onResize={handleResize}

                    // 추가 옵션들
                    minConstraints={[50, 50]}  // 크기의 최소 제한
                    maxConstraints={[500, 500]}  // 크기의 최대 제한
                  >
                    <div className="select-img">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="선택한 그림"
                      />
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
