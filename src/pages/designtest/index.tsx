// App.tsx
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableResizableImage from './DraggableResizableImage';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import styles from './App.module.css';
import html2canvas from 'html2canvas';
import Header from '../../components/Header/Header';



interface ImageProps {
  id: number;
  src: string;
  alt: string;
  zIndex: number;
  width: number;
  height: number;
  position?: { x: number; y: number };
}


const App: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [showHandles, setShowHandles] = useState(true);

  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundImageCamera, setBackgroundImageCamera] = useState('');
  const [backgroundWhite, setBackgroundWhite] = useState('');

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (newImages: File[]) => {
    const updatedImages = newImages.map((file, index) => ({
      id: images.length + index + 1,
      src: URL.createObjectURL(file),
      alt: file.name,
      zIndex: images.length + index + 1,
      width: 200,
      height: 150,
    }));
    setImages((prevImages) => [...prevImages, ...updatedImages]);
  };

  const handleImageMove = (id: number, newPosition: { x: number; y: number }) => {
    const newImages = [...images];
    const index = newImages.findIndex((image) => image.id === id);

    if (index !== -1) {
      newImages[index] = { ...newImages[index], position: newPosition };
      setImages(newImages);
    }
  };

  const handleImageResize = (id: number, width: number, height: number) => {
    const newImages = images.map((image) => (image.id === id ? { ...image, width, height } : image));
    setImages(newImages);
  };

  const handleImageOrderChange = (dragIndex: number, hoverIndex: number) => {
    const draggedImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  const handleDeleteImage = (id: number) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
  };

  const toggleHandles = () => {
    setShowHandles(!showHandles);
  };


  // 버튼 클릭 시 해당 이미지 파일 경로를 설정
  const handleButtonClick = (imageFileName: string) => {
    
    if (imageFileName === '갤럭시') {
      setBackgroundImage('/img/test22.png'); 
      setBackgroundImageCamera('/img/camera2.png');
      setBackgroundWhite('/img/backWhite.png');
    } else if (imageFileName === '아이폰') {
      setBackgroundImage('/img/test2.png'); 
      setBackgroundImageCamera('/img/test2camera.png');
      setBackgroundWhite('/img/backWhite.png');
    }
  };


  // 이미지 캡처 및 다운로드 함수
const captureAndDownloadImage = () => {
  const designImgBox = document.querySelector('.scr') as HTMLElement; // HTMLElement로 형식화

  if (designImgBox) {
    html2canvas(designImgBox, {
    }).then((canvas) => {
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
    <div className='all'>
      {/* <div className='head'>
        <Header />
      </div> */}
      <div className='ttop'>
        <div className='ddesign-button'>
          <button onClick={() => handleButtonClick('갤럭시')}>Galaxy</button>
          <button onClick={() => handleButtonClick('아이폰')}>Iphone</button>
          <div className='ssave-button'>  
            <button onClick={captureAndDownloadImage} disabled={!selectedImage}>
              Save Image
            </button>
          </div>
        </div>
      </div>
          {/* 스샷 박스 */}
      <div className='scr'>   
          {/* 케이스 */}
        <div className='case' style={{ backgroundImage: `url(${backgroundImage})`}}>

        </div>
          {/* 카메라 */}
        <div className='camera'>

        </div>
          {/* 선택한 이미지 */}
        <div className='sselect-img'>
          <DndProvider backend={HTML5Backend}>
            <div>
              <button onClick={toggleHandles}>Toggle Handles</button>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} />
            <div className={styles.app}>
              {images.map((image) => (
                <DraggableResizableImage
                  key={image.id}
                  id={image.id}
                  src={image.src}
                  alt={image.alt}
                  zIndex={image.zIndex}
                  width={image.width}
                  height={image.height}
                  position={image.position}
                  onImageMove={handleImageMove}
                  onImageResize={handleImageResize}
                  showHandles={showHandles}
                />
              ))}
            </div>
            <ImageList
              images={images.map((image) => ({ id: image.id, src: image.src, alt: image.alt }))}
              onImageOrderChange={handleImageOrderChange}
              onDeleteImage={handleDeleteImage} // Pass the function here
            />
          </DndProvider>
        </div>
      </div>

    </div>
  );
};

export default App;
