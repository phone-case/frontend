// ImageUploader.tsx
import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imageName, setImageName] = useState<string>('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPcLoadModalOpen, setIsPcLoadModalOpen] = useState(false);
  const [isServerLoadModalOpen, setIsServerLoadModalOpen] = useState(false);
  const [isServerLoadButtonEnabled, setIsServerLoadButtonEnabled] = useState<boolean>(false);
  const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const images = Array.from<File>(e.target.files);
      onImageUpload(images);
      setIsPcLoadModalOpen(false);
      setIsImageModalOpen(false);
    }
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
        onImageUpload([imageFile]);
  
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

  return (
    <div>
      <button onClick={openImageModal}><span>이미지 불러오기</span></button>
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
            <input type="file" accept="image/*" onChange={handleFileInputChange} />
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
  );
};

export default ImageUploader;
