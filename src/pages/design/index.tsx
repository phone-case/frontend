import React, { useState, ChangeEvent } from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import Header from '../../components/Header/Header';
import './style.css';

function Design() {
  const [imageName, setImageName] = useState<string>('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPcLoadModalOpen, setIsPcLoadModalOpen] = useState(false);
  const [isServerLoadModalOpen, setIsServerLoadModalOpen] = useState(false);
  const [isServerLoadButtonEnabled, setIsServerLoadButtonEnabled] = useState<boolean>(false);
  const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);

  const [selectImgZIndex, setSelectImgZIndex] = useState(5);

  
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
  
  const [backgroundreblack,setBackgroundreblack] = useState('');

  // 이미지 선택 시 호출
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      setIsPcLoadModalOpen(false);
      setIsImageModalOpen(false);
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
      setBackgroundImageCamera('/img/rewhite.png');
      setBackgroundWhite('/img/backWhite.png');
      setBackgroundreblack('/img/reblack.png')

    } else if (imageFileName === '아이폰') {
      setBackgroundImage('/img/test2.png'); 
      setBackgroundImageCamera('/img/test2camera.png');
      setBackgroundWhite('/img/backWhite.png');
      
      
    }

  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const openPcLoadModal = () => {
    setIsPcLoadModalOpen(true);
  };

  const closePcLoadModal = () => {
    setIsPcLoadModalOpen(false);
  };

  const openServerLoadModal = () => {
    setIsServerLoadModalOpen(true);
  };

  const closeServerLoadModal = () => {
    setIsServerLoadModalOpen(false);
  };

  const checkImageName = async (imageName: string) => {
    try {
      const response = await fetch(`/api/check_imagename/${imageName}`);
      const data = await response.json();
  
      if (!data.isTaken) {
        setIsIdTaken(false); // 이미지 이름 사용 가능
        setIsServerLoadButtonEnabled(false);
      } else {
        setIsIdTaken(true); // 이미지 이름 중복
        setIsServerLoadButtonEnabled(true);
      }
    } catch (error) {
      console.error('Error checking image name');
    }
  };

  const getImageFromServer = async () => {
    try {
      const response = await fetch('/api/get_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageName }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const imageBase64 = data.image_data;
  
        // Create a Blob from the base64 image data
        const byteCharacters = atob(imageBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
  
        // Create a File object from the Blob
        const fileName = 'your_filename_here.jpg'; // Set the desired file name
        const imageFile = new File([blob], fileName, { type: 'image/jpeg' });
  
        // Update your state with the image File
        setSelectedImage(imageFile);
  
        setIsServerLoadModalOpen(false);
        setIsImageModalOpen(false);
        setIsIdTaken(null);
      } else {
        console.error('Failed to fetch image from the server.');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  
// 이미지 캡처 및 다운로드 함수
const captureAndDownloadImage = () => {
  const designSelectImg = document.querySelector('.design-select-img') as HTMLElement; // HTMLElement로 형식화

  // 현재 .design-select-img의 z-index 값 저장
  const originalZIndex = designSelectImg.style.zIndex;

  // .design-select-img의 z-index를 2로 변경
  setSelectImgZIndex(2);

  const restoreOriginalZIndex = () => {
    // .design-select-img의 z-index를 원래 값으로 복원
    setSelectImgZIndex(parseInt(originalZIndex, 10));
  };

  const designImgBox = document.querySelector('.scr') as HTMLElement; // HTMLElement로 형식화

  if (designImgBox) {
    html2canvas(designImgBox, {
      onclone: (doc) => {
        const selectImgClone = doc.querySelector('.design-select-img') as HTMLElement; // HTMLElement로 형식화
        if (selectImgClone) {
          selectImgClone.style.zIndex = '2';
        }
      },
    }).then((canvas) => {
      // Canvas를 이미지로 변환
      const imgDataUrl = canvas.toDataURL('image/png');

      // 이미지를 다운로드할 링크 생성
      const a = document.createElement('a');
      a.href = imgDataUrl;
      a.download = 'design_image.png'; // 다운로드 파일 이름 지정

      // 링크를 클릭하여 다운로드 실행
      a.click();

      // 캡처 후 .design-select-img의 z-index를 원래 값으로 복원
      restoreOriginalZIndex();
    });
  }
};


  return (
    <div className='all'>
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
          <button onClick={openImageModal}><span>이미지 불러오기</span></button>
        </div>
      </div>
      <div className="design-mid">
        <div className='backWhite' style={{ backgroundImage: `url(${backgroundWhite})`,pointerEvents: 'none'}}>
        </div>
        <div className='reblack'style={{ backgroundImage: `url(${backgroundreblack})`,pointerEvents: 'none'}}>
        </div>

        <div className='scr'> {/* 이미지 저장임 스샷 하는 느낌 */}
            <div className='design-box'>
              <div className='design-img-box' style={{ backgroundImage: `url(${backgroundImage})`,pointerEvents: 'none'}}>
              </div>
              <div className='design-select-img' style={{ zIndex: selectImgZIndex }}>
                {selectedImage ? (
                  <Draggable
                    onDrag={handleDrag}
                    disabled={!isDraggingEnabled} // 드래그 활/비활 상태 설정
                    onStop={handleMouseUp} // 마우스업 드래그 비활성화
                    onStart={handleMouseDown} //마우스 다운 드래그 활성환
                    grid={[2.5, 2.5]} //선택한 이미지 이속업!
                  >
                    <Resizable
                      enable={{           // 우측, 아래, 우측아래 부분 끌어서 크기 조절 나머지는 비활
                        top: false, 
                        right: true, 
                        bottom: true, 
                        left: true,
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
          {isImageModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 불러오기</h2>
            <button onClick={openPcLoadModal}><span>내PC에서 불러오기</span></button>
            &nbsp;
            <button onClick={openServerLoadModal}><span>서버에서 불러오기</span></button>
            <br /> <br />
            <div className='close1'>
              <button onClick={closeImageModal}><span>닫기</span></button>
            </div>
          </div>
        </div>
      )}

      {isPcLoadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>내PC에서 불러오기</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className='close2'>
              <button onClick={closePcLoadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {isServerLoadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>서버에서 불러오기</h2>
            <input
              type="text"
              placeholder="image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            /> &nbsp;
            <button onClick={() => checkImageName(imageName)}>이름 확인</button>
            <p>
              <button
                disabled={!isServerLoadButtonEnabled}
                onClick={getImageFromServer}
              >
                이미지 불러오기
              </button>
            </p>
            {isIdTaken === true && <p>입력하신 이름의 이미지가 있습니다.</p>}
            {isIdTaken === false && <p>입력하신 이름의 이미지가 없습니다.</p>}
            <div className='close3'>
              <button onClick={closeServerLoadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Design;
