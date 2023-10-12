import React, { useState } from 'react';

function Design() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(''); // 초기값을 빈 문자열로 지정

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files ?? [];
    const firstImage = selectedImage[0];

    if (firstImage) {
      setImage(firstImage);
      const imageURL = URL.createObjectURL(firstImage);
      setImageUrl(imageURL);
    }
  };

  return (
    <div>
      <div className='design-left'>
        <div className='design-space'>
          {imageUrl ? (
            <img src={imageUrl} alt="Uploaded Image" />
          ) : (
            <p>No image selected</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Design;
