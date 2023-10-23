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

  // 드래그 활성/비활성 상태 추가
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(false); 


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

  // 드래그 핸들러 클릭 시 드래그 활성화
  const handleMouseDown = () => {
    setIsDraggingEnabled(true); 
  };

  // 드래그 핸들러 마우스 업 시 드래그 비활성화
  const handleMouseUp = () => {
    setIsDraggingEnabled(false); 
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
                onDrag={handleDrag}
                disabled={!isDraggingEnabled} // 드래그 활/비활 상태 설정
                onStop={handleMouseUp} // 마우스업 드래그 비활성화
              >
                <Resizable
                  enable={{           // 우측, 우측아래 부분 끌어서 크기 조절 나머지는 비활
                    top: false, 
                    right: true, 
                    bottom: false, 
                    left: false,
                    topRight: false, 
                    bottomRight: true, 
                    bottomLeft: false, 
                    topLeft: true,
                  }}
                >
                  <div className="select-img"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
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
