import React, { useState } from 'react';
import './style.css';
import Header from '../../components/Header/Header';
import S1 from './../../components/Slide/s1'; // 슬라이드 1 컴포넌트 가져오기
import S2 from './../../components/Slide/s2'; // 슬라이드 2 컴포넌트 가져오기
import S3 from './../../components/Slide/s3'; // 슬라이드 3 컴포넌트 가져오기

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [<S1 />, <S2 />, <S3 />]; // 슬라이드 컴포넌트 배열

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <Header />
      <div className="image-slider">
        <button className="prev-button" onClick={prevSlide}>
          Previous
        </button>
        {slides[currentIndex]} {/* 현재 슬라이드 표시 */}
        <button className="next-button" onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
