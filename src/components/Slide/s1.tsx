import React, { useState, useEffect, useRef } from 'react';
import S0 from '../Case-slider/s0';
import '../Slide/s1.css';

interface TextInfo {
  text: string;
  size: string;
  color: string;
  top: string;
  left: string;
  speed: number;
  delay: number;
}

const S1 = () => {
  const [texts, setTexts] = useState<TextInfo[]>([]);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const predefinedTexts = [
    '붉은하늘',
    '사과',
    '우주기린',
    '우주하마',
    '화산',
    '치킨',
    '하늘',
    '콜라',
    '노트북',
    '빨대',
    '고양이',
    '강아지',
    '책',
    '시계',
    '공백',
    
  ];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateText = () => {
    const randomIndex = Math.floor(Math.random() * predefinedTexts.length);
    const newText: TextInfo = {
      text: predefinedTexts[randomIndex],
      size: Math.floor(Math.random() * 20 + 70) + 'px', //폰트 사이즈
      color: getRandomColor(),
      top: Math.floor(Math.random() * 80) + 'vh',
      left: '90vw',
      speed: Math.random() * 0.4 + 0.1,     //빠르기
      delay: Math.random() * 3,
    };

    setTexts((prevTexts) => [...prevTexts, newText]);
  };

  useEffect(() => {
    const randomizedTexts: TextInfo[] = predefinedTexts.map((text) => ({
      text,
      size: Math.floor(Math.random() * 20 + 10) + 'px',
      color: getRandomColor(),
      top: Math.floor(Math.random() * 80) + 'vh',
      left: '100vw',
      speed: Math.random() * 0.1 + 0.1,
      delay: Math.random() * 3,
    }));

    setTexts(randomizedTexts);
    startTimeRef.current = new Date().getTime();
  }, []);

  const updateTextPositions = () => {
    setTexts((prevTexts) => {
      const updatedTexts = prevTexts.map((text) => ({
        ...text,
        left: `${parseFloat(text.left) - text.speed}vw`,
      }));

      return updatedTexts.filter((text) => parseFloat(text.left) > -10);
    });

    requestRef.current = requestAnimationFrame(updateTextPositions);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateTextPositions);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [texts]);

  useEffect(() => {
    // 초기에도 텍스트 생성
    generateText();

    // 일정한 간격(예: 5초)으로 generateText 함수 호출
    const intervalId = setInterval(generateText, 100);

    // 컴포넌트가 언마운트되면 clearInterval을 호출하여 간격을 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="s1">
      <div className="s1-background">
        {texts.map((text, index) => (
          <div
            key={index}
            className="animated-text"
            style={{
              position: 'absolute',
              fontSize: text.size,
              color: text.color,
              top: text.top,
              left: text.left,
            }}
          >
            {text.text}
          </div>
        ))}
        <S0 />
      </div>
    </div>
  );
};

export default S1;
