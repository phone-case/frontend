import React, { useState, ChangeEvent } from 'react';
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
      <div className='design-mid'>
        <div className='design-box'>
          <div className='design-image-box'>
            {selectedImage ? (
              <div className='select-img'>
                <img src={URL.createObjectURL(selectedImage)} alt="선택한 그림" />
              </div> 
                ) : (
              <div className='case-image-box'>
                <img className='case-image' src='/case.jpg' alt='카메라없는 이미지' />
                <img className='case-camera-image' src='/case-camera.jpg' alt='카메라' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
