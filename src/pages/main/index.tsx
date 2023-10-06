import React, { useRef } from 'react';
import './style.css';
import Header from '../../components/Header/Header';
import S1 from './../../components/Slide/s1'; // 슬라이드 1 컴포넌트 가져오기
import S2 from './../../components/Slide/s2'; // 슬라이드 2 컴포넌트 가져오기
import S3 from './../../components/Slide/s3'; // 슬라이드 3 컴포넌트 가져오기

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


const SlickSlider = () => {
  const settings = {

    dots: true, // 페이지 위치 아래 점
    dotsClass : "slick-dots", 	//css 지정

    infinite: true, // 무한 루프
    speed: 500, // 슬라이드 전환 속도 
    slidesToShow: 1, // 화면에 보여질 슬라이드 수
    slidesToScroll: 1, // 슬라이드를 넘길 때 이동할 슬라이드 수

    // vertical :true  수직
    
  };

  const sliderRef = useRef<Slider>(null);

  const goToSlide = (slideIndex: number) => {
    sliderRef.current!.slickGoTo(slideIndex);
  };
  
  

  return (
      <div>
        <Header/>
        <div>
          <Slider {...settings} ref={sliderRef}>
            <S1 />
            <S2 />
            <S3 />
          </Slider>
        </div>
      </div>
  );
};

export default SlickSlider;