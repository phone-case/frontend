import React, { useState, ChangeEvent } from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import './style.css';


function Design() {
  // 이미지 파일을 저장
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 이미지의 위치를 저장
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // 리사이징 중인지 여부를 저장
  const [isResizing, setIsResizing] = useState(false);

  // 이미지 선택 시 호출
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  // 드래그 중 위치를 업데이트
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
              <Draggable 
                bounds="parent" 
                onDrag={handleDrag}>
                
                  <Resizable
                    enable={{
                      top: false, 
                      right: true, 
                      bottom: false, 
                      left: false,
                      topRight: false, 
                      bottomRight: true, 
                      bottomLeft: true, 
                      topLeft: true,
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
