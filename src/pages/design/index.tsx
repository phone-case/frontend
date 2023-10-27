import React, { useState, ChangeEvent } from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import Header from '../../components/Header/Header';
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

  const [backgroundImageCamera, setBackgroundImageCamera] = useState('');

  const [backgroundWhite, setBackgroundWhite] = useState('');

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
      setBackgroundImage('/img/test1.png'); 
      setBackgroundImageCamera('/img/camera2.png');
      setBackgroundWhite('/img/backWhite.png');
    } else if (imageFileName === '아이폰') {
      setBackgroundImage('/img/test2.jpg'); 
      setBackgroundImageCamera('/img/camera2.png');
      setBackgroundWhite('/img/backWhite.png');
    }

  };

  
  // 이미지 캡처 및 다운로드 함수
  const captureAndDownloadImage = () => {
    const designImgBox = document.querySelector('.scr') as HTMLElement; // HTMLElement로 형식화

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
      <div className='head'>
        <Header />
      </div>
      <div className='top'>
        <div className='design-button'>
          <button onClick={() => handleButtonClick('갤럭시')}>Galaxy</button>
          <button onClick={() => handleButtonClick('아이폰')}>Iphone</button>
          <div className='save-button'>  
          <button onClick={captureAndDownloadImage} disabled={!selectedImage}>
            Save Image
          </button>
          </div>
        </div>
        <div className='upload-button'>
          <label htmlFor='upload' className='change'>Upload Image</label>
          <input
            id='upload'
            className='btn'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="design-mid">
        <div className='backWhite' style={{ backgroundImage: `url(${backgroundWhite})`,pointerEvents: 'none'}}>
        </div>
        
        <div className='scr'> {/* 이미지 저장임 스샷 하는 느낌 */}
            <div className='design-box'>
              <div className='design-img-box' style={{ backgroundImage: `url(${backgroundImage})`}}>
              </div>
              <div className='design-select-img'>
                {selectedImage ? (
                  <Draggable
                    onDrag={handleDrag}
                    disabled={!isDraggingEnabled} // 드래그 활/비활 상태 설정
                    onStop={handleMouseUp} // 마우스업 드래그 비활성화
                    onStart={handleMouseDown} //마우스 다운 드래그 활성환
                    grid={[10, 10]} //선택한 이미지 이속업!
                  >
                    <Resizable
                      enable={{           // 우측, 우측아래 부분 끌어서 크기 조절 나머지는 비활
                        top: true, 
                        right: true, 
                        bottom: true, 
                        left: true,
                        topRight: true, 
                        bottomRight: true, 
                        bottomLeft: true, 
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
                        
                      </div>
                    </Resizable>
                  </Draggable>
                ) : null}
              </div>
              <div className='design-camera'style={{ backgroundImage: `url(${backgroundImageCamera})`,pointerEvents: 'none'}}>
              </div>
            </div> 
          </div>
      </div>
    </div>
  );
}

export default Design;
