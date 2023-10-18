import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './style.css';

const Create: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPcUploadModalOpen, setIsPcUploadModalOpen] = useState(false);
  const [isServerUploadModalOpen, setIsServerUploadModalOpen] = useState(false);
  const [customFilename, setCustomFilename] = useState<string>('');
  const [isServerButtonEnabled, setIsServerButtonEnabled] = useState<boolean>(false);
  const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);

  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(false);

  
  useEffect(() => {
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerText;
      setPlaceholderVisible(text === '');
    }
  }, []);

  const handleInput = () => {
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerText;
      setPlaceholderVisible(text === '');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // 파일 선택 후 모달 닫기
      setIsImageModalOpen(false);
      setImageName('');
    }
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const openPcUploadModal = () => {
    setIsPcUploadModalOpen(true);
  };

  const closePcUploadModal = () => {
    setIsPcUploadModalOpen(false);
  };

  const openServerUploadModal = () => {
    setIsServerUploadModalOpen(true);
  };

  const closeServerUploadModal = () => {
    setIsServerUploadModalOpen(false);
  };

  const handleDownload = () => {
    if (image) {
      const filename = customFilename || imageName; // Use custom filename if provided, else use the original image name
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(image);
      downloadLink.download = filename;
      downloadLink.click();
      setCustomFilename(''); // Reset custom filename
    }
  };

  const handleImageSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('imageName', imageName);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
          // 이미지 업로드 후 이미지 미리보기 초기화
          setImagePreview(null);
          setIsIdTaken(null);
          setImage(null);
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setIsServerUploadModalOpen(false);
    setIsUploadModalOpen(false);

  };

  const handleTextSubmit = async () => {
    // Handle text submission here, similar to the image submission
  };

  const checkImageName = async (imageName: string) => {
    try {
      const response = await fetch(`/api/check_imagename/${imageName}`);
      const data = await response.json();
  
      if (!data.isTaken) {
        setIsIdTaken(false); // 이미지 이름 사용 가능
        setIsServerButtonEnabled(true); // 이미지 업로드 버튼 활성화
      } else {
        setIsIdTaken(true); // 이미지 이름 중복
        setIsServerButtonEnabled(false); // 이미지 업로드 버튼 비활성화
      }
    } catch (error) {
      console.error('Error checking image name');
    }
  };

  return (
    <div>
      <div className='header-div'>
        <Header />
      </div>
      <div className='mid'>
        <div className='left-box'>
          <div className='image-box'>
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>
          <button onClick={openImageModal}>이미지 불러오기</button>
          <button onClick={openUploadModal} disabled={!image}>이미지 저장하기</button>
        </div>
        <div className='right-box'>
          <form onSubmit={handleTextSubmit}>
            <div className="chat-box">
              <div
                className="text"
                ref={contentEditableRef}
                contentEditable={true}
                onInput={handleInput}
              >
                {isPlaceholderVisible && '입력하세요.'}
              </div>
            </div>
            <div className='button-box'>
              <button type="submit">전송</button>
            </div>
          </form>
        </div>
      </div>

      {isImageModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 불러오기</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={closeImageModal}>닫기</button>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 저장하기</h2>
            <button onClick={openPcUploadModal}>내PC에 저장하기</button>
            &nbsp;
            <button onClick={openServerUploadModal}>서버에 저장하기</button>
            <br /> <br />
            <button onClick={closeUploadModal}>닫기</button>
          </div>
        </div>
      )}

      {isPcUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>내PC에 저장하기</h2>
            <input
              type="text"
              placeholder="이미지 이름"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
            /> &nbsp;
            <button onClick={handleDownload}>이미지 저장하기</button>
            <br /><br />
            <button onClick={closePcUploadModal}>닫기</button>
          </div>
        </div>
      )}

      {isServerUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>서버에 저장하기</h2>
            <input
              type="text"
              placeholder="image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            /> &nbsp;
            <button onClick={() => checkImageName(imageName)}>중복 확인</button>
            <p>
              <button
                disabled={!isServerButtonEnabled}
                onClick={handleImageSubmit}
              >
                이미지 저장하기
              </button>
            </p>
            {isIdTaken === true && <p>이미 사용 중인 이름입니다.</p>}
            {isIdTaken === false && <p>사용 가능한 이름입니다.</p>}
            <button onClick={closeServerUploadModal}>닫기</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Create;
