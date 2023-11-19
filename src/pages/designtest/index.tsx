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

interface PloneCaseImage {
  src: string;
  someOtherVariable: string; // Add the type of your other variable
}

const App: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [showHandles, setShowHandles] = useState(true);
  const appRef = useRef<HTMLDivElement>(null);
  const [ploneCaseImage, setPloneCaseImage] = useState<PloneCaseImage>({
    src: "/img/test1.png",
    someOtherVariable: "plone1", // Set a default value for your other variable
  });

  const handleImageUpload = async (newImages: File[]) => {
    const updatedImagesPromises = newImages.map(async (file, index) => {
      return new Promise<ImageProps>((resolve) => {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const img = new Image();
            img.src = e.target.result.toString();
  
            img.onload = () => {
              resolve({
                id: images.length + index + 1,
                src: URL.createObjectURL(file),
                alt: file.name,
                zIndex: images.length + index + 1,
                width: img.width/3,
                height: img.height/3,
              });
            };
          }
        };
  
        reader.readAsDataURL(file);
      });
    });
  
    const updatedImages = await Promise.all(updatedImagesPromises);
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

  const captureContent = () => {
    // Toggle handles off
    setShowHandles(false);
  
    // Remove border from the appRef element
    if (appRef.current) {
      appRef.current.style.border = '3px solid transparent';
    }
  
    const delay = 100;
  
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
  
          // Toggle handles back on after capturing1
          setShowHandles(true);
  
          // Show border again for the appRef element
          if (appRef.current) {
            appRef.current.style.border = '3px solid black';
          }
        });
      }
    }, delay);
  };

  const handleImageChange = (newSrc: string, newVariable: string) => {
    setPloneCaseImage({
      src: newSrc,
      someOtherVariable: newVariable,
    });
  };

  const handleOtherVariableAction = () => {
    if (ploneCaseImage.someOtherVariable === "plone1") {
      setPloneCaseImage({
        src: "/img/test1-k.png",
        someOtherVariable: "plone1-on",
      });
    } else if (ploneCaseImage.someOtherVariable === "plone1-on") {
      setPloneCaseImage({
        src: "/img/test1.png",
        someOtherVariable: "plone1",
      });
    } else if (ploneCaseImage.someOtherVariable === "plone2") {
      setPloneCaseImage({
        src: "/img/test2-t.png",
        someOtherVariable: "plone2-on",
      });
    } else if (ploneCaseImage.someOtherVariable === "plone2-on") {
      setPloneCaseImage({
        src: "/img/test2.png",
        someOtherVariable: "plone2",
      });
    }
  };

  const handleOtherVariableAction2 = () => {
    if (ploneCaseImage.someOtherVariable === "plone1") {
      setPloneCaseImage({
        src: "/img/test1-s.png",
        someOtherVariable: "plone1-on",
      });
    } else if (ploneCaseImage.someOtherVariable === "plone1-on") {
      setPloneCaseImage({
        src: "/img/test1.png",
        someOtherVariable: "plone1",
      });
    } else if (ploneCaseImage.someOtherVariable === "plone2") {
      setPloneCaseImage({
        src: "/img/test2-s.png",
        someOtherVariable: "plone2-on",
      });
    } else if (ploneCaseImage.someOtherVariable === "plone2-on") {
      setPloneCaseImage({
        src: "/img/test2.png",
        someOtherVariable: "plone2",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.button_div}>
        <button className={styles.button1} onClick={() => handleImageChange("/img/test1.png", "plone1")}>
          <img src='/img/galaxy.jpg' alt='sam'
          style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
        </button>
        <button className={styles.button2} onClick={() => handleImageChange("/img/test2.png", "plone2")}>
          <img src='/img/iplone.png' alt='sam'
          style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
        </button>
        <br />
        <button className={styles.button3} onClick={handleOtherVariableAction}>
          <img src='/img/t.jpg' alt='sam'
          style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
        </button>
        <button className={styles.button4} onClick={handleOtherVariableAction2}>
          <img src='/img/s.jpg' alt='sam'
          style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
        </button>
        <br />
        <button className={styles.button6} onClick={captureContent}>
          <img src='/img/p.png' alt='sam'
          style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
        </button>
        <ImageUploader  onImageUpload={handleImageUpload} />
        
      </div>
      <div className={styles.app} ref={appRef}>
        <div className={styles.ploneCase} style={{ pointerEvents: 'none' }}>
          <img src={ploneCaseImage.src} alt="Plone Case" 
          style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </div>
        {images.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <DraggableResizableImage
              className={styles.draggableResizableImage}
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
          </div>
        ))}
        
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
