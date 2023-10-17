import React, { useState, ChangeEvent } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

import './style.css';

function Design() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  // 이미지를 선택
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // 선택한 이미지를 상태에 설정
      setSelectedImage(selectedFile);
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
        <div className="design-box">
          <div className="design-image-box">
            {selectedImage ? (
              <Draggable>
                    <Resizable
                      width={200}
                      height={200}
                    >
                  <div className="select-img">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="선택한 그림"
                    />
                  </div>
                </Resizable>
              </Draggable>
            ) : (
              <div className="case-image-box">
                <img
                  className="case-image"
                  src="/img/case.jpg"
                  alt="카메라없는 이미지"
                />
                <img
                  className="case-camera-image"
                  src="/img/case-camera.jpg"
                  alt="카메라"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
