import React, { useState, ChangeEvent } from 'react';
<<<<<<< HEAD
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
              <Draggable bounds="parent"> 
                <Resizable
                  width={200} // 초기 너비
                  height={200} // 초기 높이
                >
                  <div className="select-img">
=======
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
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

  // 이미지 파일 경로 상태 추가
  const [backgroundImage, setBackgroundImage] = useState(''); 



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
  
  // 버튼 클릭 시 해당 이미지 파일 경로를 설정
  const handleButtonClick = (imageFileName: string) => {
    
    if (imageFileName === '갤럭시') {
      setBackgroundImage('/img/test1.jpg'); 
    } else if (imageFileName === '아이폰') {
      setBackgroundImage('/img/test2.jpg'); 
    }
  };

  // 이미지 캡처 및 다운로드 함수
  const captureAndDownloadImage = () => {
    const designImgBox = document.querySelector('.design-img-box') as HTMLElement; // HTMLElement로 형식화

    if (designImgBox) {
      html2canvas(designImgBox).then((canvas) => {
        // Canvas를 이미지로 변환
        const imgDataUrl = canvas.toDataURL('image/png');

        // 이미지를 다운로드할 링크 생성
        const a = document.createElement('a');
        a.href = imgDataUrl;
        a.download = 'design_image.png'; // 다운로드 파일 이름 지정

        // 링크를 클릭하여 다운로드 실행
        a.click();
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleButtonClick('갤럭시')}>갤럭시</button>
        <button onClick={() => handleButtonClick('아이폰')}>아이폰</button>
        <button onClick={captureAndDownloadImage}>디자인 이미지 캡쳐</button>

      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="design-mid">
        <div className='design-box'>
          <div className='design-img-box' style={{ backgroundImage: `url(${backgroundImage})` }}>
            {selectedImage ? (
              <Draggable
                bounds="parent"
                onDrag={handleDrag}
                disabled={!isDraggingEnabled} // 드래그 활/비활 상태 설정
                onStop={handleMouseUp} // 마우스업 드래그 비활성화
                onStart={handleMouseDown} //마우스 다운 드래그 활성환
                grid={[10, 10]} //선택한 이미지 이속업!
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
                    topLeft: false,
                  }}
                >
                  <div className="select-img"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
>>>>>>> 00fcc4605bf7a85cb54d8024aa3d14fa91210b05
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="선택한 그림"
                    />
<<<<<<< HEAD
=======
                    <div className="drag-handle"/>
>>>>>>> 00fcc4605bf7a85cb54d8024aa3d14fa91210b05
                  </div>
                </Resizable>
              </Draggable>
            ) : null}
<<<<<<< HEAD
            
          </div>
        </div>
=======
          </div>
        </div> 
>>>>>>> 00fcc4605bf7a85cb54d8024aa3d14fa91210b05
      </div>
    </div>
  );
}

export default Design;