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
                <Draggable 
                bounds="parent" //움직일수있는 범위 정함
                
                > 
                  
                  <Resizable
                    width={200} // 초기 너비
                    height={200} // 초기 높이
                  
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
