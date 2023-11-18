// App.tsx
import React, { useState, useRef } from 'react';
import DraggableResizableImage from './DraggableResizableImage';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import Header from '../../components/Header/Header';
import styles from './App.module.css';
import html2canvas from 'html2canvas';

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
  const appRef = useRef<HTMLDivElement>(null);

    // 이미지 파일 경로 상태 추가
    const [backgroundImage, setBackgroundImage] = useState(''); 

    const [backgroundImageCamera, setBackgroundImageCamera] = useState('');
  
    const [backgroundWhite, setBackgroundWhite] = useState('');
    
    const [backgroundreblack,setBackgroundreblack] = useState('');

    
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

  const captureContent = () => {
    if(!showHandles){

      const designImgBox = document.querySelector(`.${styles.app}`) as HTMLElement;

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
    }

    else if(showHandles){
      setShowHandles(!showHandles);
      const delay = 300;
      setTimeout(() => {
        const designImgBox = document.querySelector(`.${styles.app}`) as HTMLElement;

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

            setShowHandles(!showHandles);

          });
        }
      }, delay);
    }
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
  
  return (
    <div>
      <Header />
      <div className={styles.button_div}>
        <button onClick={() => handleButtonClick('갤럭시')}>Galaxy</button>
        <button onClick={() => handleButtonClick('아이폰')}>Iphone</button>
        <button onClick={toggleHandles}>이미지 핸들</button>
        <button onClick={captureContent}>이미지 저장</button>
        <ImageUploader onImageUpload={handleImageUpload} />
      </div>

      <div className='mid'>
        <div className={styles.app} ref={appRef}>
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
      </div>
      
      <ImageList
        images={images.map((image) => ({ id: image.id, src: image.src, alt: image.alt }))}
        onImageOrderChange={handleImageOrderChange}
        onDeleteImage={handleDeleteImage}
      />
    </div>
  );
};

export default App;
