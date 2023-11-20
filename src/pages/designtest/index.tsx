// App.tsx
import React, { useState, useRef } from 'react';
import DraggableResizableImage from './DraggableResizableImage';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import Header from '../../components/Header/Header';
import styles from './App.module.css';
import html2canvas from 'html2canvas';
<<<<<<< HEAD
=======
import Header from '../../components/Header/Header';


>>>>>>> main

interface ImageProps {
  id: number;
  src: string;
  alt: string;
  zIndex: number;
  width: number;
  height: number;
  position?: { x: number; y: number };
}

<<<<<<< HEAD
=======
interface PloneCaseImage {
  src: string;
  someOtherVariable: string; // Add the type of your other variable
}
>>>>>>> 596e3ff3fcdd1cdde01a1e1274d8ede017b64f37

const App: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [showHandles, setShowHandles] = useState(true);
  const appRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const [backgroundImageCamera, setBackgroundImageCamera] = useState('');



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
      width: 300,
      height: 300,
    }));
=======
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
>>>>>>> 596e3ff3fcdd1cdde01a1e1274d8ede017b64f37
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

<<<<<<< HEAD
  const toggleHandles = () => {
    setShowHandles(!showHandles);
  };

<<<<<<< HEAD
=======
>>>>>>> 596e3ff3fcdd1cdde01a1e1274d8ede017b64f37
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

<<<<<<< HEAD
    // 버튼 클릭 시 해당 이미지 파일 경로를 설정
    const handleButtonClick = (imageFileName: string) => {
    
      if (imageFileName === '갤럭시') {
        setBackgroundImageCamera('/img/camera2.png');

      } else if (imageFileName === '아이폰') {
        setBackgroundImageCamera('/img/test2camera.png');
      }
  
    };
  
    
=======
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

>>>>>>> 596e3ff3fcdd1cdde01a1e1274d8ede017b64f37
  return (
    <div>
      <Header />
      <div className={styles.button_div}>
<<<<<<< HEAD
        <button onClick={() => handleButtonClick('갤럭시')}>Galaxy</button>
        <button onClick={() => handleButtonClick('아이폰')}>Iphone</button>
        <button onClick={toggleHandles}>이미지 핸들</button>
        <button onClick={captureContent}>이미지 저장</button>
        <ImageUploader onImageUpload={handleImageUpload} />
=======
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
        
>>>>>>> 596e3ff3fcdd1cdde01a1e1274d8ede017b64f37
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
<<<<<<< HEAD
        <div className={styles.ploneCase}style={{ backgroundImage: `url(${backgroundImageCamera})`}}>
        </div>
=======
        
>>>>>>> 596e3ff3fcdd1cdde01a1e1274d8ede017b64f37
      </div>
      <ImageList
        images={images.map((image) => ({ id: image.id, src: image.src, alt: image.alt }))}
        onImageOrderChange={handleImageOrderChange}
        onDeleteImage={handleDeleteImage}
      />
=======

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

>>>>>>> main
    </div>
  );
};

export default App;
