import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './style.css';

const Create: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
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
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
          <button onClick={openModal}>이미지 불러오기</button>
          <button onClick={handleSubmit}>Upload</button>
        </div>
        <div className='right-box'>
          <div className="chat-box">
            <textarea id='textarea' className='text'></textarea>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 불러오기</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
