// s1.tsx
import React from 'react';
import '../Case-slider/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const S0 = () => {
  // 슬라이드에 표시할 내용과 이미지 경로
  const slides = [
    { id: 1, content: 'Slide 1 Content', image: './img/slide1.png' },
    { id: 2, content: 'Slide 2 Content', image: './img/slide2.png' },
    { id: 3, content: 'Slide 3 Content', image: './img/slide3.png' },
    { id: 4, content: 'Slide 4 Content', image: './img/slide4.png' },
    { id: 5, content: 'Slide 5 Content', image: './img/slide5.png' },
    { id: 6, content: 'Slide 6 Content', image: './img/slide6.png' },
    { id: 7, content: 'Slide 7 Content', image: './img/slide7.png' },
    { id: 8, content: 'Slide 8 Content', image: './img/slide8.png' },

  ];


  const settings = {

    infinite: true,   // 무한 루프
    speed: 500,       // 슬라이드 전환 속도
    slidesToShow: 4,  // 화면에 보여질 슬라이드 수
    slidesToScroll: 4, // 슬라이드를 넘길 때 이동할 슬라이드 수
    dots: false,        //밑에 점 활성화
    
    arrows: true, //옆으로 이동하는 화살표 표시 여부임
    
  };

  return (
    <div className="s0">
      <div className='s0-slider0-ww'>
        <Slider className='s0-slider'{...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="s0-slide-content">
              <img src={slide.image} alt={`Slide ${slide.id}`} className="s0-slide-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default S0;
