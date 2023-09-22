import React, { useState } from 'react';
import './style.css'; 

const ImageSlider = () => {
  const images = [
    './img/phone1.jpg',
    './img/phone2.jpg',
    './img/phone3.png',
    // 이미지 퍼블릭 폴더 img 폴더 안에있음 대용품 넣어둠
  ];


  

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <button className="prev-button" onClick={prevSlide}>
        Previous
      </button>
      <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
      <button className="next-button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default ImageSlider;
