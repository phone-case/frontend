import React, { useState, ChangeEvent } from 'react';
import './style.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function Design() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleImageLoaded = (image) => {
    // Do something when the image is loaded
  };

  const handleCompleteCrop = (crop) => {
    setCompletedCrop(crop);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className="design-mid">
        <div className="design-box">
          <div className="design-image-box">
            {selectedImage ? (
              <ReactCrop
                src={URL.createObjectURL(selectedImage)}
                crop={crop}
                onImageLoaded={handleImageLoaded}
                onComplete={handleCompleteCrop}
                onChange={handleCropChange}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;
